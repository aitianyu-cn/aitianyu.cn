/**@format */

import React from "react";
import { isMobile } from "react-device-detect";
import { Configure } from "src/dty/core/Configure";
import { guid } from "src/dty/Guid";
import { checkLogin, getUserName, ILoginData, ILoginResult, updateLogin } from "src/dty/ManagerHelper";
import { IShellProperty } from "src/dty/model/IShell";
import { SHA256 } from "src/dty/SHA256";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { RequestWaiting } from "../common/RequestWaiting";

import "./css/user.login.css";
import "./css/user.logged.css";

export class User extends TYViewComponent {
    private userName: string;
    private userTokenOrPW: string;

    private isLogging: boolean;

    public constructor(props: IShellProperty) {
        super(props);

        this.userName = "";
        this.userTokenOrPW = "";

        this.isLogging = false;
    }

    public componentDidMount(): void {
        //
    }

    public render(): React.ReactNode {
        if (this.isLogging) {
            return this.renderBeingLogging();
        }

        if (checkLogin()) {
            return this.renderLogged();
        }

        return this.renderLoginPanel();
    }

    private renderLoginPanel(): React.ReactNode {
        return (
            <div className="user_login_panel_base">
                <h2 className="user_login_panel_title">{`Ai天宇 管理中心`}</h2>
                <div className="user_login_panel_content">
                    <div className="user_login_panel_content_line">
                        <div className="user_login_panel_content_line_name">用户名：</div>
                        <div className="user_login_panel_content_line_input">
                            <input id="userNameInput" className="user_login_panel_content_line_inputer" />
                        </div>
                    </div>
                    <div className="user_login_panel_content_line">
                        <div className="user_login_panel_content_line_name">{`密   码：`}</div>
                        <div className="user_login_panel_content_line_input">
                            <input id="userPasswordInput" className="user_login_panel_content_line_inputer" type={"password"} />
                        </div>
                    </div>
                </div>
                <div className="user_login_panel_login_button_container">
                    <button
                        className={isMobile ? "user_login_panel_login_button_mob" : "user_login_panel_login_button"}
                        onClick={this.onLogin.bind(this)}>
                        登录
                    </button>
                </div>
            </div>
        );
    }

    private renderLogged(): React.ReactNode {
        return (
            <div>
                <div>
                    {/* <div>退出登录</div> */}
                    {/* <img alt="Logout" /> */}
                </div>
                <div>
                    {/* <div>用户：</div> */}
                    <h1>{`${getUserName()}`}</h1>
                </div>
            </div>
        );
    }

    private renderBeingLogging(): React.ReactNode {
        const config = Configure.generateConfigure();
        config.trigger("Horizontal_Navigation_valid", { obj: "disable" });

        return <RequestWaiting alt={"登陆中..."} reload={true} />;
    }

    private onLogin(): void {
        const userInput = document.getElementById("userNameInput") as HTMLInputElement;
        const pwInput = document.getElementById("userPasswordInput") as HTMLInputElement;

        const config = Configure.generateConfigure();
        if (!userInput || !pwInput) {
            config.trigger("Message_Dialog_Open", { obj: "当前页面存在错误，请刷新后再试" });
            return;
        }

        const userName = userInput.value;
        const userPW = pwInput.value;
        if (!userName || !userPW) {
            config.trigger("Message_Dialog_Open", { obj: "用户名和密码不能为空" });
            return;
        }

        this.isLogging = true;
        this.forceUpdate();

        this.login(userName, userPW)
            .then(this.loginDone.bind(this), this.loginFail.bind(this))
            .finally(() => {
                this.isLogging = false;
                this.forceUpdate();
                config.trigger("Horizontal_Navigation_valid", { obj: "enable" });
            });
    }

    private async login(userName: string, userPW: string): Promise<ILoginResult> {
        const loginResult: ILoginResult = {
            state: 404,
            error: "当前无法连接到服务器，请稍后重试",
            token: {
                validation: 0,
                singature: "",
            },
        };

        try {
            const codePW = SHA256.create(userPW);
            const streaming = guid().replace("-", "");
            const remote = `/manager/usercenter/login/${userName}/${codePW.getHash()}/${streaming}`;

            const response = await fetch(remote);
            const receive = await response.json();

            loginResult.state = receive["state"] || 505;

            const token = receive["token"];

            if (200 !== loginResult.state || (200 === loginResult.state && !token)) {
                if (200 === loginResult.state && !token) {
                    loginResult.state = 505;
                }

                if (505 === loginResult.state) {
                    loginResult.error = "数据处理出错，当前页面与服务器可能版本存在差异";
                } else {
                    loginResult.error = receive["error"] || "未知的错误";
                }

                return loginResult;
            }

            loginResult.token.validation = token["validation"] || 0;
            loginResult.token.singature = token["singature"] || "";

            if (0 === loginResult.token.validation || !loginResult.token.singature) {
                loginResult.state = 505;
                loginResult.error = "数据处理出错，当前页面与服务器可能版本存在差异";
                return loginResult;
            }

            const singatureHash = SHA256.create(`${loginResult.token.singature}${streaming}`);
            const loginData: ILoginData = {
                logged: true,
                token: singatureHash.getHash(),
                name: userName,
                time: loginResult.token.validation,
            };

            updateLogin(loginData);

            return loginResult;
        } catch {
            return loginResult;
        }
    }

    private loginDone(result: ILoginResult): void {
        const config = Configure.generateConfigure();
        if (result.state !== 200) {
            config.trigger("Message_Dialog_Open", { obj: result.error });
            return;
        }
    }

    private loginFail(): void {
        const config = Configure.generateConfigure();
        config.trigger("Message_Dialog_Open", { obj: "未知错误，请稍后重试" });
    }
}

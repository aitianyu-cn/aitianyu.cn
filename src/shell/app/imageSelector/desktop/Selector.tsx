/**@format */

import React from "react";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { FetchFileLoader, XMLHttpFileLoader } from "ts-core/FileLoader";
import { require_msgbundle } from "ts-core/I18n";
import { MapOfString } from "ts-core/Types";

import "./css/selector.css";

interface IImageGetList {
    valid: boolean;
    all: string[];
    selected: string[];
}

interface IImageGets {
    name: string;
    image: string;
}

const messageBundle = require_msgbundle("image-selector", "app");

const IMAGE_SELECTER_URL = "/remote-imageSelector/aitianyu/cn/app/image/selector/getter/list";
const IMAGE_GET_SRC_URL = "/remote-imageSelector/aitianyu/cn/app/image/selector/getter/images";

const IMAGE_SELECT_URL = "/remote-imageSelector/aitianyu/cn/app/image/selector/select";
const IMAGE_UNSELECT_URL = "/remote-imageSelector/aitianyu/cn/app/image/selector/unselect";

export class ImageSelector extends React.Component<IReactProperty, IReactState> {
    private token: string;
    private isLoaded: boolean;
    private hasError: boolean;
    private images: MapOfString;
    private selected: string[];

    public constructor(props: IReactProperty) {
        super(props);

        this.token = "";
        const search = !!window.location.search ? window.location.search.substring(1) : "";
        if (search) {
            const searches = search.split("&");
            for (const item of searches) {
                const sp = item.split("=");
                if (sp[0] === "token" && sp[1]) {
                    this.token = sp[1];
                    break;
                }
            }
        }
        this.isLoaded = false;
        this.hasError = false;
        this.images = {};
        this.selected = [];
    }

    public componentDidMount(): void {
        if (this.isLoaded || this.hasError || !!!this.token) {
            return;
        }

        WaitingDialog.withDialog(async () => {
            await this._loadImageSource();
            this.isLoaded = true;
            this.forceUpdate();
        });
    }

    public render(): React.ReactNode {
        if (!!!this.token || this.hasError) {
            return this._renderForInvalid();
        }
        return this._render();
    }

    private _renderForInvalid(): React.ReactNode {
        return <div className="main_body">{messageBundle.getText("INVALID_IMAGE_SELECTOR_TOKEN")}</div>;
    }

    private _render(): React.ReactNode {
        return (
            <div className="selector_content">
                <div className="selector_title selector_source_title">{messageBundle.getText("SELECTOR_SOURCE_TITLE")}</div>
                <div className="selector_title selector_selected_title">{messageBundle.getText("SELECTOR_SELECTED_TITLE")}</div>
                <div className="selector_list_base selector_source">{this._renderSourceImages()}</div>
                <div className="selector_list_base selector_selected">{this._renderSelectedImages()}</div>
            </div>
        );
    }

    private _renderSourceImages(): React.ReactNode {
        const images: React.ReactNode[] = [];
        for (const [key, image] of Object.entries(this.images)) {
            const className = this.selected.includes(key) ? "image_img_selected image_base" : "image_base";
            images.push(
                <img
                    key={key}
                    id={key}
                    src={image}
                    alt={key}
                    className={className}
                    onDoubleClick={() => {
                        if (this.selected.includes(key)) {
                            return;
                        }

                        WaitingDialog.withDialog(async () => {
                            const result = await this._toSelect(key);
                            if (result) {
                                this.selected.push(key);
                                this.forceUpdate();
                            } else {
                                alert(messageBundle.getText("SELECT_IMG_FAILED"));
                            }
                        });
                    }}
                />,
            );
        }
        return <div>{images}</div>;
    }

    private _renderSelectedImages(): React.ReactNode {
        const selectedImages: React.ReactNode[] = [];
        for (const key of this.selected) {
            selectedImages.push(
                <img
                    key={key}
                    id={key}
                    src={this.images[key]}
                    alt={key}
                    className="image_base"
                    onDoubleClick={() => {
                        WaitingDialog.withDialog(async () => {
                            const result = await this._toUnselect(key);
                            if (result) {
                                const selected = this.selected;
                                this.selected = [];
                                for (const item of selected) {
                                    if (item !== key) {
                                        this.selected.push(item);
                                    }
                                }

                                this.forceUpdate();
                            } else {
                                alert(messageBundle.getText("UNSELECT_IMG_FAILED"));
                            }
                        });
                    }}
                />,
            );
        }

        return <div>{selectedImages}</div>;
    }

    private async _loadImageSource(): Promise<void> {
        const url = `${IMAGE_SELECTER_URL}?token=${this.token}`;

        return new Promise<void>(async (resolve) => {
            try {
                const loader = new FetchFileLoader(url);
                const response = await loader.openAsync();
                if (response["response"]) {
                    const imageRes = response["response"] as IImageGetList;
                    if (imageRes.valid) {
                        let loaded = 0;
                        document.title = `${messageBundle.getText("IMAGE_SELECTOR_TITLE")} - ${messageBundle.getText(
                            "IMAGE_SELECTOR_TITLE_LOADING",
                        )}(${loaded}/${imageRes.all.length})`;
                        this.selected = imageRes.selected;
                        const aPromise: Promise<void>[] = [];
                        for (const img of imageRes.all) {
                            aPromise.push(
                                (async () => {
                                    try {
                                        await this._loadImage(img);
                                    } catch {}
                                    loaded++;
                                    document.title = `${messageBundle.getText("IMAGE_SELECTOR_TITLE")} - ${messageBundle.getText(
                                        "IMAGE_SELECTOR_TITLE_LOADING",
                                    )}(${loaded}/${imageRes.all.length})`;
                                })(),
                            );
                        }
                        await Promise.all(aPromise);
                        document.title = `${messageBundle.getText("IMAGE_SELECTOR_TITLE")} - ${messageBundle.getText(
                            "IMAGE_SELECTOR_TITLE_COUNT",
                        )}(${imageRes.all.length})`;
                    }
                }
            } catch {
                this.hasError = true;
            } finally {
                resolve();
            }
        });
    }

    private async _loadImage(images: string): Promise<void> {
        const loader = new XMLHttpFileLoader<any>(IMAGE_GET_SRC_URL);
        const payload = { token: this.token, images: [images] };
        loader.setSend(JSON.stringify(payload));
        const response = JSON.parse(await loader.openAsync("Post"));
        if (response["response"]) {
            const imagePair = response["response"] as IImageGets[];
            for (const image of imagePair) {
                this.images[image.name] = image.image;
            }
        }
    }

    private async _toSelect(key: string): Promise<boolean> {
        const url = `${IMAGE_SELECT_URL}?token=${this.token}&images=${key}`;
        return new Promise<boolean>(async (resolve) => {
            let result = false;
            try {
                const loader = new FetchFileLoader(url);
                const response = await loader.openAsync();
                if (response["response"] === "success") {
                    result = true;
                }
            } finally {
                resolve(result);
            }
        });
    }

    private async _toUnselect(key: string): Promise<boolean> {
        const url = `${IMAGE_UNSELECT_URL}?token=${this.token}&images=${key}`;
        return new Promise<boolean>(async (resolve) => {
            let result = false;
            try {
                const loader = new FetchFileLoader(url);
                const response = await loader.openAsync();
                if (response["response"] === "success") {
                    result = true;
                }
            } finally {
                resolve(result);
            }
        });
    }
}

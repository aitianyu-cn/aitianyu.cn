/**@format */

import React from "react";

import "./css/footer.mob.css";

export function mobileFooter(): React.ReactNode {
    return (
        <div>
            <div>
                联系我们<a href="mailto:public@aitianyu.cn">邮件</a>&nbsp;&amp;&nbsp;
                <a href="tel:+8615685154601">电话</a>
            </div>
            <div>© aitianyu.cn 2021-2024</div>
            <div>
                <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
                    黔ICP备2021004555号-1
                </a>
            </div>
        </div>
    );
}

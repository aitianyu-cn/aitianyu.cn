/**@format */

import React from "react";
import { ReactWaiting } from "tianyu-shell/ui/react/widget/control/ReactWaiting";

export function renderLoading(): React.ReactNode {
    return (
        <div className="document_container_base">
            <div className="document_baseGrid">
                <div className="document_replace document_replace_1"></div>
                <div className="document_content">
                    <ReactWaiting />
                </div>
                <div className="document_replace document_replace_2"></div>
            </div>
        </div>
    );
}

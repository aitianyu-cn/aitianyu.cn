/**@format */

import React from "react";
import { ReactWaiting } from "tianyu-shell/ui/react/widget/control/ReactWaiting";

export function renderLoading(): React.ReactNode {
    return (
        <div className="document_container_base">
            <div className="document_baseGrid" />
            <ReactWaiting />
        </div>
    );
}
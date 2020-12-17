/* @flow */
/* eslint react/react-in-jsx-scope: off */

// import { destroyElement, toCSS } from "belter/src";

// import { EVENT } from "../../constants";
export const EVENT = {
    RENDER: "zoid-render",
    RENDERED: "zoid-rendered",
    DISPLAY: "zoid-display",
    ERROR: "zoid-error",
    CLOSE: "zoid-close",
    DESTROY: "zoid-destroy",
    PROPS: "zoid-props",
    RESIZE: "zoid-resize",
    FOCUS: "zoid-focus",
};

const CLASS = {
    VISIBLE: "zoid-visible",
    INVISIBLE: "zoid-invisible",
};

export function containerTemplate({
    uid,
    frame,
    prerenderFrame,
    doc,
    props,
    event,
    dimensions: { width, height },
}) {
    if (!frame || !prerenderFrame) {
        return;
    }

    const div = doc.createElement("div");
    div.setAttribute("id", uid);
    const style = doc.createElement("style");
    if (props.cspNonce) {
        style.setAttribute("nonce", props.cspNonce);
    }
    frame.setAttribute("scrolling", "no");
    frame.setAttribute("loading", "lazy");
    frame.setAttribute("horizontalscrolling", "no");
    frame.setAttribute("verticalscrolling", "no");
    frame.setAttribute("frameborder", "0");
    prerenderFrame.setAttribute("scrolling", "no");

    style.appendChild(
        doc.createTextNode(`
            #${uid} {
                display: inline-block;
                position: relative;
                width: ${width};
                height: ${height};
            }
            #${uid} > iframe {
                display: inline-block;
                position: absolute;
                min-width: 100% !important;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transition: opacity .2s ease-in-out;
                overflow: hidden !important;
                border: none !important;
            }
            #${uid} > iframe.${CLASS.INVISIBLE} {
                opacity: 0;
            }
            #${uid} > iframe.${CLASS.VISIBLE} {
                opacity: 1;
        }
        `)
    );

    div.appendChild(frame);
    div.appendChild(prerenderFrame);
    div.appendChild(style);

    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);

    event.on(EVENT.RENDERED, () => {
        prerenderFrame.classList.remove(CLASS.VISIBLE);
        prerenderFrame.classList.add(CLASS.INVISIBLE);

        frame.classList.remove(CLASS.INVISIBLE);
        frame.classList.add(CLASS.VISIBLE);

        setTimeout(() => {
            // destroyElement(prerenderFrame);
            prerenderFrame.remove();
        }, 1);
    });

    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
        if (typeof newWidth === "number") {
            div.style.width = `${newWidth}px`;
        }

        if (typeof newHeight === "number") {
            div.style.height = `${newHeight}px`;
        }
    });

    return div;
}

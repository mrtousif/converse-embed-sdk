/* @jsx node */
// import iFrameResizer from "iframe-resizer/js/iframeResizer";
import * as zoid from "zoid/dist/zoid.frame";
// import { node, dom } from "jsx-pragmatic";
import { containerTemplate } from "./containerTemplate";
// const element = document.getElementById("converse-app");

// const styleElement =
//     "<style> iframe { width: 1px; min-width: 100%; background-color: transparent;}</style>";
// element.insertAdjacentHTML("afterbegin", styleElement);

// const newElement =
//     '<iframe id="converseIframe" loading="lazy" src="http://localhost:1234"  frameborder="0"></iframe>';

// element.insertAdjacentHTML("beforeend", newElement);

// // // targetOrigin: "http://localhost:1234";
// iFrameResizer([{ log: true }], "#converseIframe");

// window.addEventListener("DOMContentLoaded", function (event) {
//     new MyWidget("#converse-app", "toto", "tata");
//     console.log(CONVERSE_WEBSITE_ID);
// });

const zoidComponentInit = zoid.create({
    tag: "converse-presentation",
    url: "http://localhost:1234",
    dimensions: {
        width: "100%",
        height: "500px",
    },
    props: {
        website: {
            type: "string",
        },
        pageUrl: {
            type: "string",
        },
        postId: {
            type: "string",
        },
        backgroundColor: {
            type: "string",
        },
        // updateBackgroundColor: {
        //     type: "function",
        //     // required: true,
        // },
    },
    containerTemplate: containerTemplate,
    // prerenderTemplate: function template({ doc }) {
    //     const html = doc.createElement("html");
    //     const el = Object.assign(doc.createElement("p"), {
    //         textContent: `Loading please wait`,
    //         className: "and-is-classy",
    //     });
    //     html.appendChild(el);
    //     el.insertAdjacentHTML("afterbegin", preloaderStyle);
    //     return html;
    // },
});

// const tag = document.getElementById("converse-script");
// let rawData = tag.getAttribute("data-config");
// rawData = rawData.replace(/'/g, '"');
// let data = JSON.parse(rawData);
// console.log(data);

// console.log(CONVERSE_CONFIG);
const options = {
    website: document.location.origin,
    pageUrl: CONVERSE_CONFIG.pageUrl,
    postId: CONVERSE_CONFIG.id,
    backgroundColor: window
        .getComputedStyle(document.body, null)
        .getPropertyValue("background-color"),
    // updateBackgroundColor: (elementId, color) => {
    //     const el = document.querySelector(`#${elementId}`);
    //     el.style.backgroundColor = color;
    // },
};
const zoidComponent = zoidComponentInit(options);
// console.log(zoidComponent);

// TODO verify website before rendering

const elementId = "#converse-app";
zoidComponent.render(elementId);

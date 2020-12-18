import * as zoid from "zoid/dist/zoid.frame";
// import { node, dom } from "jsx-pragmatic";
import containerTemplate from "./containerTemplate";
import prerenderTemplate from "./prerenderTemplate";
// const element = document.getElementById("converse-app");

// window.addEventListener("DOMContentLoaded", function (event) {
//     new MyWidget("#converse-app", "toto", "tata");
//     console.log(CONVERSE_WEBSITE_ID);
// });

const localhost = "http://localhost:1234";
const publicUrl = "https://adilide-converse.vercel.app/";
// const publicUrl2 = "https://converse-frontend-parcel.vercel.app/";

const zoidComponentInit = zoid.create({
    tag: "converse-presentation",
    url: process.env.NODE_ENV === "development" ? localhost : publicUrl,
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
    prerenderTemplate: prerenderTemplate,
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

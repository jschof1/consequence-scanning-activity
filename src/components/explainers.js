import { writable } from "svelte/store";

export const explainers = writable([
    introduction = {
        title: "Introduction",
        description: "This is a description of the introduction",
        url: "https://www.google.com",
    },
]);
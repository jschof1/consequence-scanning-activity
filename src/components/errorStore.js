import { writable } from "svelte/store";

export const errorMessage = writable({ "message": "", "state": true });

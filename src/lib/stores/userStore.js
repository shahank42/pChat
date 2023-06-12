import { writable } from "svelte/store";

export const nickname = writable("");
export const chatMode = writable(false);
export const roomCreator = writable(false);
import { writable, type Writable } from 'svelte/store';
import type { Message, Profile } from '../../types/types';


export const nickname: Writable<string> = writable('');
export const chatMode: Writable<boolean> = writable(false);
export const roomCreator: Writable<string> = writable('');
export const roomDeleted: Writable<boolean> = writable(false);
export const roomID: Writable<string> = writable('');
export const peerList: Writable<Profile[]> = writable([]);
export const micOn: Writable<boolean> = writable(false);
export const messages: Writable<Message[]> = writable([]);

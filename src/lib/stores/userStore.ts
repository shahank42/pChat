import { writable, type Writable } from 'svelte/store';
import type { Profile } from '../../types/types';

export const nickname: Writable<string> = writable('');
export const chatMode: Writable<boolean> = writable(false);
export const roomCreator: Writable<string> = writable('');
export const roomDeleted: Writable<boolean> = writable(false);
export const roomID: Writable<string> = writable('');
export const peerList: Writable<Profile[]> = writable([]);

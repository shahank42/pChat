export interface Message {
	type: string;
	id: string;
	sender: string;
	content: string;
	timestamp: string;
}

export interface PageData {
	id: string;
}

export interface User {
	nickname: string;
	isCreator: boolean;
}

export interface Profile {
	id: string;
	name: string;
	joined: number;
};

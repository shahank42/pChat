export interface Message {
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

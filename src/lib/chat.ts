import { joinRoom, selfId, type Room } from 'trystero';
import type { Message, PageData, Profile } from '../types/types';
import { nickname, messages, roomID, peerList, micOn } from '$lib/stores/userStore';
import { get } from 'svelte/store';

let room: Room;
let selfStream: MediaStream;

export const exitVoiceChat = async () => {
	room.removeStream(selfStream as MediaStream);
	selfStream.getTracks().forEach(function (track) {
		track.stop();
	});
};

export const joinVoiceChat = async () => {
	// this object can store audio instances for later

	selfStream = await navigator.mediaDevices.getUserMedia({
		audio: true,
		video: false
	});

	// send stream to peers currently in the room
	room.addStream(selfStream);

	// send stream to peers who join later
	room.onPeerJoin(
		async (peerId) => get(micOn) && room.addStream(selfStream as MediaStream, peerId)
	);
};

export const setupTrystero = (roomID: string) => {
	const config = { appId: 'pChat-rooms' };
	room = joinRoom(config, roomID);

	const [sendProfile, getProfile] = room.makeAction('profile');
	const [sendMessage, getMessage] = room.makeAction('message');

	let selfJoined = false;

	const profile: Profile = {
		id: selfId,
		name: get(nickname),
		joined: Date.now()
	};

	room.onPeerJoin((peerId) => {
		sendProfile(profile, peerId);
		selfJoined = true;
	});

	room.onPeerLeave((peerId) => {
		let leaver = get(peerList).find((peer) => peer.id === peerId);
		const date = new Date();
		let newMessage: Message = {
			type: 'status-left',
			id: date.toISOString(),
			sender: get(nickname),
			content: `${leaver?.name} left the room`,
			timestamp: `${date.toTimeString().slice(0, 8)}`
		};
		messages.update((prev) => {
			prev.push(newMessage);
			return prev;
		});
		messages.update((prev) => prev);
		selfJoined = false;

		peerList.update((prev) => prev.filter((peer) => peer.id != leaver?.id));
	});

	getMessage((data, peerId) => {
		let recievedMessage = data as Message;
		messages.update((prev) => {
			prev.push(recievedMessage);
			return prev;
		});

		messages.update((prev) => prev);
	});

	getProfile((data, peerId) => {
		let otherProfile = data as Profile;
		peerList.update((prev) => [...prev, otherProfile]);
		if (otherProfile.joined > profile.joined) {
			const date = new Date();
			let newMessage: Message = {
				type: 'status-joined',
				id: date.toISOString(),
				sender: otherProfile.name,
				content: `${otherProfile.name} joined the room`,
				timestamp: `${date.toTimeString().slice(0, 8)}`
			};
			messages.update((prev) => {
				prev.push(newMessage);
				return prev;
			});
			messages.update((prev) => prev);
		}
	});

	const peerAudios: any = {};

	// handle streams from other peers
	room.onPeerStream((stream, peerId) => {
		// create an audio instance and set the incoming stream
		const audio = new Audio();
		audio.srcObject = stream;
		audio.autoplay = true;

		// add the audio to peerAudio object if you want to address it for something
		// later (volume, etc.)
		peerAudios[peerId] = audio;
		console.log(peerAudios);
	});

	return sendMessage;
};

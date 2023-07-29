<script lang="ts">
	import type { Message, PageData, Profile } from '../types/types';

	import { joinRoom, selfId } from 'trystero';
	import { afterUpdate } from 'svelte';
	import MessageFeed from './MessageFeed.svelte';
	import MessagePrompt from './MessagePrompt.svelte';
	import { nickname, roomID } from '$lib/stores/userStore';
	import { page } from '$app/stores';

	// export let data: PageData;
	// export let toggleChatInterface: () => void = () => {};
	export let messageScrollNode: HTMLElement;


	let showChatInterface: boolean = $nickname !== '';
	let messages: Message[] = [];

	$roomID = $page.url.pathname;

	// console.log("chat begins")	

	const config = { appId: 'pChat-rooms' };
	const room = joinRoom(config, $roomID);

	const [sendProfile, getProfile] = room.makeAction('profile');
	const [sendMessage, getMessage] = room.makeAction('message');

	let peerList: Profile[] = [];

	let selfJoined = false;

	const profile: Profile = {
		id: selfId,
		name: $nickname,
		joined: Date.now()
	};

	room.onPeerJoin((peerId) => {
		sendProfile(profile, peerId);
		selfJoined = true;
	});

	room.onPeerLeave((peerId) => {
		let leaver = peerList.find((peer) => peer.id === peerId);
		const date = new Date();
		let newMessage: Message = {
			type: 'status-left',
			id: date.toISOString(),
			sender: $nickname,
			content: `${leaver?.name} has left the room`,
			timestamp: `${date.toTimeString().slice(0, 8)}`
		};
		pushMessageToMessageLog(newMessage);
		selfJoined = false;
		peerList = peerList.filter((peer) => peer.id != leaver?.id);
	});

	getMessage((data, peerId) => {
		let recievedMessage = data as Message;
		messages = [...messages, recievedMessage];
	});

	getProfile((data, peerId) => {
		let otherProfile = data as Profile;
		peerList = [...peerList, otherProfile];
		if (otherProfile.joined > profile.joined) {
			const date = new Date();
			let newMessage: Message = {
				type: 'status-joined',
				id: date.toISOString(),
				sender: otherProfile.name,
				content: `${otherProfile.name} has joined the room`,
				timestamp: `${date.toTimeString().slice(0, 8)}`
			};
			pushMessageToMessageLog(newMessage);
		}
	});

	$: console.log(peerList);

	const pushMessageToMessageLog = (newMessage: Message) => {
		messages = [...messages, newMessage];
	};

	afterUpdate(() => {
		if (messages)
			messageScrollNode.scroll({ top: messageScrollNode.scrollHeight, behavior: 'smooth' });
	});
</script>


<div bind:this={messageScrollNode} class="flex-1 bg-surface-500/30 p-4 pt-8 overflow-y-scroll">
  <MessageFeed {messages} />
</div>

<MessagePrompt sendMessageAction={sendMessage} {pushMessageToMessageLog} />
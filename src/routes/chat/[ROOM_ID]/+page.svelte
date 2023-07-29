<script lang="ts">
	import type { Message, PageData, User } from '../../../types/types';

	import { joinRoom, selfId } from 'trystero';
	import { afterUpdate } from 'svelte';
	import MessageFeed from '../../../components/MessageFeed.svelte';
	import MessagePrompt from '../../../components/MessagePrompt.svelte';
	import NicknamePrompt from '../../../components/NicknamePrompt.svelte';
	import { nickname, roomID } from '$lib/stores/userStore';


	export let data: PageData;


	let showChatInterface: boolean = $nickname !== '';
	let messages: Message[] = [];
	let messageScrollNode: HTMLElement;

	$roomID = data.id;

	const toggleChatInterface = () => {
		showChatInterface = true;
	};

	const config = { appId: 'pChat-rooms' };
	const room = joinRoom(config, $roomID);


	type PeerProfile = {
		id: string;
		name: string;
		joined: number;
	};

	const [sendProfile, getProfile] = room.makeAction('profile');
	const [sendMessage, getMessage] = room.makeAction('message');

	const selfProfile: PeerProfile = {
		id: selfId,
		name: $nickname,
		joined: Date.now()
	};

	let peerList: PeerProfile[] = [];

	let selfJoined = false;

	room.onPeerJoin((peerId) => {
		sendProfile(selfProfile, peerId);
		selfJoined = true;
	});

	room.onPeerLeave((peerId) => {
		let leaver = peerList.find((peer) => peer.id === peerId);
		// messageLog = [...messageLog, `${leaver?.name} has left`];
		selfJoined = false;
		peerList = peerList.filter((peer) => peer.id != leaver?.id);
	});

	getMessage((data, peerId) => {
		let recievedMessage = data as Message;
		// let sender = peerList.find((peer) => peer.id === peerId)?.name;
		messages = [...messages, recievedMessage];
	});

	const pushMessageToMessageLog = (newMessage: Message) => {
		messages = [...messages, newMessage];
	}

	afterUpdate(() => {
		if (messages)
			messageScrollNode.scroll({ top: messageScrollNode.scrollHeight, behavior: 'smooth' });
	});
</script>

<main class="flex flex-1 flex-col overflow-y-scroll" bind:this={messageScrollNode}>
	{#if !showChatInterface}
		<NicknamePrompt toJoinRoom {toggleChatInterface} />
	{/if}
	
	{#if showChatInterface}
		<div class="flex-1 bg-surface-500/30 p-4 pt-8">
			<MessageFeed messages={messages} />
		</div>
	{/if}
</main>

{#if showChatInterface}
	<MessagePrompt sendMessageAction={sendMessage} {pushMessageToMessageLog} />
{/if}

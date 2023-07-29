<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import type { Message, PageData, User } from '../../../types/types';

	import { joinRoom, selfId } from 'trystero';
	import Gun from 'gun/gun';
	import { afterUpdate } from 'svelte';
	import MessageFeed from '../../../components/MessageFeed.svelte';
	import MessagePrompt from '../../../components/MessagePrompt.svelte';
	import NicknamePrompt from '../../../components/NicknamePrompt.svelte';
	import { nickname, roomID, gunRef, roomDeleted, roomCreator } from '$lib/stores/userStore';


	export let data: PageData;


	let showChatInterface: boolean = $nickname !== '';
	let messages: Message[] = [];
	let messageScrollNode: HTMLElement;

	$roomID = data.id;

	const toggleChatInterface = () => {
		showChatInterface = true;
	};

	const gun = Gun({
		peers: [
			'https://pchat-relay-test.shahank.repl.co/gun',
			// 'https://gun-manhattan.herokuapp.com/gun',
			// 'https://relay.129.153.59.37.nip.io/gun',
			// 'https://peer.wallie.io/gun',
			// 'https://gundb-relay-mlccl.ondigitalocean.app/gun',
		],
	});

	$gunRef = gun.get($roomID);

	const config = { appId: 'pChat-rooms' };
	const room = joinRoom(config, $roomID);

	$gunRef.get('destroy-room').on((deleted) => {
		$roomDeleted = deleted === 'yes' ? true : false;
	});

	let newUser: User = {
		nickname: $nickname,
		isCreator: $roomCreator == $nickname
	};
	$gunRef.get('users').set(newUser);


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

	// if (!$roomDeleted) {
	// 	$gunRef
	// 		.get('feed')
	// 		.get('messages')
	// 		.map()
	// 		.once((message: any) => {
	// 			if (message) {
	// 				messages = [...messages, message];
	// 			}
	// 		});
	// }

	getMessage((data, peerId) => {
		let recievedMessage = data as Message;
		// let sender = peerList.find((peer) => peer.id === peerId)?.name;
		messages = [...messages, recievedMessage];
	});

	const pushMessage = (newMessage: Message) => {
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
	<MessagePrompt sendMessageAction={sendMessage} messages={messages} pushMessage={pushMessage} />
{/if}

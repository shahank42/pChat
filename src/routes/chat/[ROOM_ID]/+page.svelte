<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import type { Message, PageData, User } from '../../../types/types';


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
			'https://gun-manhattan.herokuapp.com/gun',
			// 'https://relay.129.153.59.37.nip.io/gun',
			'https://peer.wallie.io/gun',
			'https://gundb-relay-mlccl.ondigitalocean.app/gun',
		],
	});

	$gunRef = gun.get($roomID);

	$gunRef.get('destroy-room').on((deleted) => {
		$roomDeleted = deleted === 'yes' ? true : false;
	});

	let newUser: User = {
		nickname: $nickname,
		isCreator: $roomCreator == $nickname
	};
	$gunRef.get('users').set(newUser);

	if (!$roomDeleted) {
		$gunRef
			.get('feed')
			.get('messages')
			.map()
			.once((message: any) => {
				if (message) {
					messages = [...messages, message];
				}
			});
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
			<MessageFeed {messages} />
		</div>
	{/if}
</main>

{#if showChatInterface}
	<MessagePrompt />
{/if}

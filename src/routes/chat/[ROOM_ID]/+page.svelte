<script lang="ts">
	import type { Message, PageData, Profile } from '../../../types/types';

	import { joinRoom, selfId } from 'trystero';
	import { afterUpdate } from 'svelte';
	import MessageFeed from '../../../components/MessageFeed.svelte';
	import MessagePrompt from '../../../components/MessagePrompt.svelte';
	import NicknamePrompt from '../../../components/NicknamePrompt.svelte';
	import ChatInterface from '../../../components/ChatInterface.svelte';
	import { nickname, roomID } from '$lib/stores/userStore';

	export let data: PageData;

	let showChatInterface: boolean = $nickname !== '';
	let messageScrollNode: HTMLElement;


	const toggleChatInterface = () => {
		showChatInterface = true;
	};
	
</script>

<main class="flex flex-1 flex-col" >
	{#if !showChatInterface}
		<NicknamePrompt toJoinRoom {toggleChatInterface} />
	{/if}

	{#if showChatInterface}
		<ChatInterface {messageScrollNode}  />
	{/if}
</main>

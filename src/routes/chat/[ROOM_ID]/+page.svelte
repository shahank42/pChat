<script lang="ts">
	import NicknamePrompt from '../../../components/NicknamePrompt.svelte';
	import ChatInterface from '../../../components/ChatInterface.svelte';
	import { nickname } from '$lib/stores/userStore';

	let showChatInterface: boolean = $nickname !== '';
	let messageScrollNode: HTMLElement;

	const toggleChatInterface = () => {
		showChatInterface = true;
	};
</script>

<main class="no-scrollbar flex flex-1 flex-col overflow-y-scroll">
	{#if !showChatInterface}
		<NicknamePrompt toJoinRoom {toggleChatInterface} />
	{/if}

	{#if showChatInterface}
		<ChatInterface {messageScrollNode} />
	{/if}
</main>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>

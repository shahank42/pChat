<script lang="ts">
	import { afterUpdate } from 'svelte';
	import MessageFeed from './MessageFeed.svelte';
	import MessagePrompt from './MessagePrompt.svelte';
	import { roomID, messages } from '$lib/stores/userStore';
	import { page } from '$app/stores';
	import { setupTrystero } from '$lib/chat';

	$roomID = $page.url.pathname;
	let sendMessage = setupTrystero($roomID);

	export let messageScrollNode: HTMLElement;
	afterUpdate(() => {
		if ($messages)
			messageScrollNode.scroll({ top: messageScrollNode.scrollHeight, behavior: 'smooth' });
	});
</script>

<div
	bind:this={messageScrollNode}
	class="flex-1 overflow-y-scroll bg-surface-500/30 px-1 py-2 md:px-4 md:py-4"
>
	<MessageFeed />
</div>

<MessagePrompt sendMessageAction={sendMessage} />

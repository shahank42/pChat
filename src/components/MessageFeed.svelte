<script lang="ts">
	import type { Message } from '../types/types';
	import MessageBubbleOther from './MessageBubbles/MessageBubbleOther.svelte';
	import MessageBubbleSender from './MessageBubbles/MessageBubbleSender.svelte';
	import { messages, nickname, roomDeleted, roomID } from '$lib/stores/userStore';

	import StatusBubble from './StatusBubble.svelte';

	$messages = $messages;
	// export let messages: Message[] = [];
</script>

<section class="w-full flex-1 space-y-3 px-4">
	{#each $messages as message}
		{#if message.type === 'status-joined' || message.type === 'status-left'}
			<StatusBubble {message} />
		{:else if message.sender !== $nickname}
			<MessageBubbleOther {message} />
		{:else}
			<MessageBubbleSender {message} />
		{/if}
	{/each}
</section>

<script lang="ts">
	import MessageBubbleOther from './MessageBubbles/MessageBubbleOther.svelte';
	import MessageBubbleSender from './MessageBubbles/MessageBubbleSender.svelte';
	import { nickname, roomDeleted } from '$lib/stores/userStore';

	import roomDestroyedPic from '../svg/Destroyed room.svg?url';

	export let messages: any;
</script>

<section class="w-full flex-1 space-y-3 p-4">
	{#if $roomDeleted}
		<div class="card">
			<header class="card-header text-3xl">
				<h1>This pChat room has been destroyed.</h1>
			</header>

			<section class="p-4">
				All messages and logs in this room currently and permanently remain inaccessible.
			</section>

			<footer class="card-footer text-sm">
				For further queries and/or grievances, contact the creator of the room.
			</footer>

			<img src={roomDestroyedPic} class="mx-auto h-64 py-10" alt="menu" />
		</div>
	{/if}

	{#if !$roomDeleted}
		{#each messages as message}
			{#if message.sender !== $nickname}
				<MessageBubbleOther {message} />
			{:else}
				<MessageBubbleSender {message} />
			{/if}
		{/each}
	{/if}
</section>

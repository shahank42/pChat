<script lang="ts">
	import { nickname } from "$lib/stores/userStore";
	import { onMount } from "svelte"
	import MessageBubbleOther from "./MessageBubbles/MessageBubbleOther.svelte";
	import MessageBubbleSender from "./MessageBubbles/MessageBubbleSender.svelte";

    import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

    export let messages: any;


	const t: ToastSettings = {
		message: 'Chatroom URL copied to clipboard!',
		background: 'variant-filled-primary',
		classes: "mt-20", 
		timeout: 1500,
	};
	
    onMount(() => {
        // toastStore.trigger(t);
    })
</script>

<section class="w-full flex-1 p-4 space-y-5">
    {#each messages as message}
        {#if message.sender !== $nickname}
            <MessageBubbleOther {message} />
        {:else}
            <MessageBubbleSender {message} />
        {/if}
        
    {/each}
</section>
<script lang="ts">
	import { nickname } from "$lib/stores/userStore";
	import MessageBubbleOther from "./MessageBubbles/MessageBubbleOther.svelte";
	import MessageBubbleSender from "./MessageBubbles/MessageBubbleSender.svelte";

    export let messages: any;
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
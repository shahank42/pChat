<script lang="ts">
	import { afterUpdate } from "svelte";

    export let messages: any;

    let messageScrollNode: HTMLElement;

    afterUpdate(() => {
        if (messages) messageScrollNode.scroll({ top: messageScrollNode.scrollHeight, behavior: 'smooth' });
    });
</script>

<section class="w-full max-h-[550px] p-4 overflow-y-auto space-y-4" bind:this={messageScrollNode}>
    {#each messages as message}
        <div>
            <strong>{message.sender}:</strong> {message.content}
        </div>
        
    {/each}
</section>
<script lang="ts">
    import { Modal, modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	import { nickname, roomDeleted } from "$lib/stores/userStore";
	import MessageBubbleOther from "./MessageBubbles/MessageBubbleOther.svelte";
	import MessageBubbleSender from "./MessageBubbles/MessageBubbleSender.svelte";

    export let messages: any;
</script>

<section class="w-full flex-1 p-4 space-y-3">
    {#if $roomDeleted}
        <div class="card">
            <header class="card-header text-3xl">
                <h1>This pChat room has been destroyed.</h1>
            </header>
            <section class="p-4">
                The creator of this room has destroyed this room. 
            </section>
            <section class="p-4">
                All messages and logs in this room currently and permanently remain inaccessible.
            </section>
            <footer class="card-footer text-sm">
                For further queries and/or grievances, contact the creator of the room.
            </footer>
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
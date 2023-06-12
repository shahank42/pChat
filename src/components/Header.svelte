<script lang="ts">
    import { chatMode, roomCreator } from "$lib/stores/userStore";
    import {  modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';

    const modal: ModalSettings = {
    	type: 'confirm',
    	title: 'Are you sure?',
    	body: 'This action is irreversible. Do you want to delete these chat logs?',
    	response: (r: boolean) => console.log('response:', r),
    };
</script>

<header class="w-full flex flex-row text-center border-b border-grey p-4 items-center justify-between">
	<a
        href="/"
        class="btn"
        on:click={() => {
            $chatMode = false;
        }}
    >pChat</a>

    {#if ($chatMode && $roomCreator)}
        <button class="btn variant-filled-primary" on:click={() => {
            modalStore.trigger(modal);
        }}>
            Destroy pChat Room
        </button>
    {/if}
</header>
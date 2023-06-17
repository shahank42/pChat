<script lang="ts">
    import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
    import type { DrawerSettings } from '@skeletonlabs/skeleton';

    import pChatLogo from "../svg/pChat.svg?url";
    import { chatMode, gunRef, roomCreator, roomDeleted, roomID } from "$lib/stores/userStore";
    import {  modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
	import type { User } from '../types/types';



    const destroyRoom = () => {
        drawerStore.close();
        $gunRef.get("feed").put(null);
        $gunRef.get("destroy-room").put("yes");
        // goto("/");   
    }

    const modal: ModalSettings = {
    	type: 'confirm',
    	title: 'Are you sure?',
    	body: 'This action is irreversible, and will render the room inaccessible.',
    	response: (r: boolean) => {
            if (r) {
                destroyRoom();
            }
        },
    };
</script>

<section>
    <div class="w-full flex flex-col text-center border-b border-grey p-4 items-center justify-between">
        <!-- <a
            href="/"
            class="btn"
        >pChat</a> -->
        <img src={pChatLogo} class="h-30 mx-auto" alt="menu" />
        <p>made by shahank</p>
    </div>

    <div class="w-full flex flex-col items-center justify-between border border-grey border-b">
        <div class="my-2">
            Room ID: {$roomID}
        </div>
        {#if ($chatMode && $roomCreator && !$roomDeleted)}
            <button class="btn variant-filled-primary mx-auto w-3/4 mt-1 mb-4" on:click={() => {
                modalStore.trigger(modal);
            }}>
                    Destroy pChat Room
            </button>
        {/if}
</div>
</section>


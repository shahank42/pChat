<script lang="ts">
    import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
    import type { DrawerSettings } from '@skeletonlabs/skeleton';

    import menuIconUrl from "../svg/hamburger-svgrepo-com.svg?url";
    import pChatLogo from "../svg/pChat.svg?url";
    
    import { chatMode, gunRef, roomCreator, roomDeleted } from "$lib/stores/userStore";
    import {  modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';

    // const destroyRoom = () => {
    //     $gunRef.get("feed").put(null);
    //     $gunRef.get("destroy-room").put("yes");
    //     goto("/");   
    // }

    // const modal: ModalSettings = {
    // 	type: 'confirm',
    // 	title: 'Are you sure?',
    // 	body: 'This action is irreversible, and will render the room inaccessible.',
    // 	response: (r: boolean) => {
    //         if (r) {
    //             destroyRoom();
    //         }
    //     },
    // };

    const drawerSettings: DrawerSettings = {
    	id: 'sidebar',
        position: 'right',
    	bgBackdrop: 'backdrop-blur-xl',
        border: "border border-grey",
    	width: 'w-[280px] md:w-[480px]',
    	padding: 'p-4',
    	rounded: 'rounded-xl',
    };
</script>

<header class="w-full flex flex-row text-center border-b border-grey p-4 items-center justify-between">
	<button
        class="btn"
        on:click={() => {
            $chatMode = false;
            $roomCreator = "";
            goto("/")
        }}
    >
        <img src={pChatLogo} class="h-10 mx-auto" alt="menu" />
    </button>

    <!-- {#if ($chatMode && $roomCreator && !$roomDeleted)}
        <button class="btn variant-filled-primary" on:click={() => {
            modalStore.trigger(modal);
        }}>
            Destroy pChat Room
        </button>
    {/if} -->


    {#if ($chatMode) }
        <button
            on:click={() => {
                drawerStore.open(drawerSettings);
            }}
            class="btn variant-filled-secondary"
        >
            <img src={menuIconUrl} class="w-7 h-7" alt="menu" />
        </button>
    {/if}
</header>
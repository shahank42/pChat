<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	// import type { User } from '../types/types';

	import { drawerStore, modalStore } from '@skeletonlabs/skeleton';

	import { chatMode, roomCreator, roomDeleted, roomID } from '$lib/stores/userStore';
	import pChatLogo from '../svg/pChat.svg?url';

    
	// let usersList: User[] = [];
	// $gunRef.get("users").map().on((user: User) => {
	// 	if (user && ($nickname !== "")) {
	// 		usersList.push(user);
	// 	}
	// });

	// $: console.log(usersList)

	const destroyRoom = () => {
		drawerStore.close();
	};

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Are you sure?',
		body: 'This action is irreversible, and will render the room inaccessible.',
		response: (r: boolean) => {
			if (r) destroyRoom();
		}
	};
</script>

<section>
	<div
		class="border-grey flex w-full flex-col items-center justify-between border-b p-4 text-center"
	>
		<img src={pChatLogo} class="h-30 mx-auto" alt="menu" />

		<p>made by shahank</p>
	</div>

	<div class="border-grey flex w-full flex-col items-center justify-between border border-b">
		<div class="my-2">
			Room ID: {$roomID}
		</div>

		{#if $chatMode && $roomCreator && !$roomDeleted}
			<button
				class="btn variant-filled-primary mx-auto mb-4 mt-1 w-3/4"
				on:click={() => {
					modalStore.trigger(modal);
				}}
			>
				Destroy pChat Room
			</button>
		{/if}
	</div>

	<!-- <div>
        <h1 class="p-4 px-6 text-xl">People in this room:</h1>
        {#each usersList as user}
            <p class="p-2 px-6">{user.nickname}</p>
        {/each}
    </div> -->
</section>

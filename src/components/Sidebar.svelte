<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	// import type { User } from '../types/types';

	import { drawerStore, modalStore } from '@skeletonlabs/skeleton';

	import { chatMode, roomCreator, roomDeleted, roomID, peerList } from '$lib/stores/userStore';
	import pChatLogo from '../svg/pChat.svg?url';
	import type { Profile } from '../types/types';

	// let usersList: User[] = [];
	// $gunRef.get("users").map().on((user: User) => {
	// 	if (user && ($nickname !== "")) {
	// 		usersList.push(user);
	// 	}
	// });

	// $: console.log(usersList)

	let _peerList: Profile[] = [];
	$: _peerList = $peerList;

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

<section class="">
	<div class="bg-surface-800">
		<div class="border-grey flex w-full flex-col items-center justify-between p-4 text-center">
			<img src={pChatLogo} class="h-30 mx-auto" alt="menu" />
			<p>made by shahank</p>
		</div>
		<div class="border-grey flex w-full flex-col items-center justify-between border border-b">
			{#if $chatMode && $roomCreator && !$roomDeleted}
				<button
					class="btn variant-filled-primary mx-auto my-4 w-3/4"
					on:click={() => {
						modalStore.trigger(modal);
					}}
				>
					Destroy pChat Room
				</button>
			{/if}
		</div>
	</div>

	<div class="flex flex-col">
		<h1 class="px-6 pb-1 pt-4 text-lg">Peers ({_peerList.length}):</h1>
		<div class="px-6">
			<ul
				class="flex h-[20rem] md:h-[30rem] bottom-1 w-full flex-col gap-2 overflow-y-auto rounded-lg bg-surface-900 py-2 md:gap-3 md:py-3"
			>
				{#each _peerList as peer}
					<li
						class="mx-2 flex h-12 shrink-0 flex-col justify-center rounded-lg bg-surface-600 px-2 md:px-3 text-sm md:h-14 md:text-base"
					>
						<div class="flex w-fit">
							<img
								src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${peer.name}`}
								alt="avatar"
								class="w-8 md:w-10 rounded-lg"
							/>
							<p class="ml-2 md:ml-4 m-auto">{peer.name}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

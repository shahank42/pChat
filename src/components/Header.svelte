<script lang="ts">
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	import { drawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { chatMode, joinVoiceChat, roomCreator } from '$lib/stores/userStore';

	import menuIconUrl from '../svg/hamburger-svgrepo-com.svg?url';
	import pChatLogo from '../svg/pChat.svg?url';

	const drawerSettings: DrawerSettings = {
		id: 'sidebar',
		position: 'right',
		bgBackdrop: 'backdrop-blur-xl',
		border: 'border border-grey',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl'
	};
</script>

<header
	class="border-grey flex w-full flex-row items-center justify-between border-b p-4 text-center"
>
	<button
		class="btn"
		on:click={() => {
			$chatMode = false;
			$roomCreator = '';
			goto('/');
		}}
	>
		<img src={pChatLogo} class="mx-auto h-10" alt="menu" />
	</button>

	{#if $chatMode}
		<button
			on:click={() => {
				$joinVoiceChat();
			}}>join vc</button
		>
		<button
			class="btn variant-filled-secondary"
			on:click={() => {
				drawerStore.open(drawerSettings);
			}}
		>
			<img src={menuIconUrl} class="h-7 w-7" alt="menu" />
		</button>
	{/if}
</header>

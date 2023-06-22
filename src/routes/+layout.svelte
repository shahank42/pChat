<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { Modal } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Header from '../components/Header.svelte';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<div class="flex h-[100dvh] flex-col overflow-hidden md:mx-auto md:w-3/4 md:border-l md:border-r">
	<Modal />

	<Drawer>
		{#if $drawerStore.id === 'sidebar'}
			<Sidebar />
		{/if}
	</Drawer>

	<Header />

	<slot />
</div>

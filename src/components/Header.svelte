<script lang="ts">
    import { drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

    import menuIconUrl from "../svg/hamburger-svgrepo-com.svg?url";

    const drawerSettings: DrawerSettings = {
	    id: 'example-3',
	    // Provide your property overrides:
	    bgDrawer: 'bg-surface-800 text-white border',
	    width: 'w-[280px] md:w-[480px]',
	    padding: 'p-4',
	    rounded: 'rounded-xl',
    };
</script>

<header class="w-full flex flex-row text-center border-b border-grey p-4 items-center justify-between">
	<a href="/"class="" >pChat</a>
	<button class="btn variant-filled-secondary" on:click={() => {
        drawerStore.open(drawerSettings);
    }}>
        <img src={menuIconUrl} class="w-5" alt="menu" />
    </button>
</header>
<script lang="ts">
    import { chatMode, roomCreator } from "$lib/stores/userStore";
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
            // open a popup
        }}>
            Destroy pChat Room
        </button>
    {/if}
</header>
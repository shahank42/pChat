<script lang="ts">
    export let toJoinRoom: boolean = false;
    export let toCreateRoom: boolean = false;
    export let toggleChatInterface: () => void = () => {};

    import { nickname } from "$lib/stores/userStore";
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">	
    <label class="label w-3/4 md:w-1/2">
        <span>Choose a nickname:</span>
        <input class="input w-full p-4 h-10" type="text" bind:value={$nickname}/>
    </label>

    {#if toJoinRoom}
        <button class="btn variant-filled w-3/4 md:w-1/2 mt-5" on:click={toggleChatInterface}>Join this pChat Room!</button>
    {/if}

    {#if toCreateRoom}
	    <a href={`/chat/${crypto.randomUUID()}`} class="btn variant-filled w-3/4 md:w-1/2 mt-5">Create a pChat Room!</a>
    {/if}
</div>
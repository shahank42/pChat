<script lang="ts">
    export let toJoinRoom: boolean = false;
    export let toCreateRoom: boolean = false;
    export let toggleChatInterface: () => void = () => {};

    import { chatMode, nickname, roomCreator } from "$lib/stores/userStore";

    const generateRoomID = () => Date.now().toString(26) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(26);
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">	
    <label class="label w-3/4 md:w-1/2">
        <span>Choose a nickname:</span>
        <input class="input w-full p-4 h-10" type="text" bind:value={$nickname}/>
    </label>

    {#if toJoinRoom}
        <button 
            class="btn variant-filled w-3/4 md:w-1/2 mt-5" 
            on:click={() => {
                $chatMode = true;
                toggleChatInterface();
            }}
        >Join this pChat Room!</button>
    {/if}

    {#if toCreateRoom}
	    <a 
            href={`/chat/${generateRoomID()}`} 
            class="btn variant-filled w-3/4 md:w-1/2 mt-5"
            on:click={() => {
                $chatMode = true;
                $roomCreator = true;
            }}
        >Create a pChat Room!</a>
    {/if}
</div>
<script lang="ts">
	import { goto } from "$app/navigation";

    export let toJoinRoom: boolean = false;
    export let toCreateRoom: boolean = false;
    export let toggleChatInterface: () => void = () => {};

    import { chatMode, gunRef, nickname, roomCreator, roomDeleted, roomID } from "$lib/stores/userStore";
	import type { User } from "../types/types";

    const generateRoomID = () => Date.now().toString(26) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(26);
    const roomGen = () => {
        $roomID = generateRoomID();
        return $roomID;
    }

    const joinRoom = () => {
        if ($nickname !== "") {
            $chatMode = true;
            toggleChatInterface();
        }
    }

    const createRoom = () => {
        if ($nickname !== "") {
            $chatMode = true;
            $roomDeleted = false;
            $roomCreator = $nickname;
        }
        goto($nickname !== "" ? `/chat/${roomGen()}` : "/");
    }

    const onPromptKeydown = (event: KeyboardEvent): void => {
		if (["Enter"].includes(event.code)) {
			event.preventDefault();
			if (toJoinRoom) joinRoom();
            if (toCreateRoom) createRoom();
		}
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">	
    
    <label class="label w-3/4 md:w-1/2">
        <span>Choose a nickname:</span>
        <input class="input w-full p-4 h-10" type="text" bind:value={$nickname} on:keydown={onPromptKeydown} />
    </label>

    {#if toJoinRoom}
        <button 
            class="btn variant-filled w-3/4 md:w-1/2 mt-5" 
            on:click={joinRoom}
        >Join this pChat Room!</button>
    {/if}

    {#if toCreateRoom}
	    <a 
            href={$nickname !== "" ? `/chat/${roomGen()}` : "/"} 
            class="btn variant-filled w-3/4 md:w-1/2 mt-5"
            on:click={createRoom}
        >Create a pChat Room!</a>
    {/if}
</div>
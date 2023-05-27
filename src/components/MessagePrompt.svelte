<script lang="ts">
    export let messageGunRef: any;

    import type { Message } from "../types/types";
    import { nickname } from "$lib/stores/userStore";

    let currentMessage: string = "";

    const sendMessage = () => {
		let timestamp = Date.now();
		let newMessage: Message = {
			id: timestamp,
			sender: $nickname,
			content: currentMessage,
			timestamp: timestamp,
		}
		messageGunRef.set(newMessage);
		currentMessage = "";
	}

    const onPromptKeydown = (event: KeyboardEvent): void => {
		if (["Enter"].includes(event.code)) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="bg-surface-500/30 p-4 border-t border-grey ">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
        <button class="input-group-shim">+</button>
        <textarea
            bind:value={currentMessage}
            class="bg-transparent border-0 ring-0 p-2 resize-none"
            name="prompt"
            id="prompt"
            placeholder=""
            rows="2"
            on:keydown={onPromptKeydown}
        />
        <button class="variant-filled-primary" on:click={sendMessage}>Send</button>
    </div>
</div>
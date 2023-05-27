<script lang="ts">
    export let messageGunRef: any;

    import type { Message } from "../types/types";
    import { nickname } from "$lib/stores/userStore";

    let currentMessage: string = "";

    const sendMessage = () => {
        const date = new Date();
		let newMessage: Message = {
			id: date.toISOString(),
			sender: $nickname,
			content: currentMessage,
			timestamp: `${date.toDateString()} | ${date.toTimeString().slice(0, 8)}`,
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

<div class="bg-surface-500/30 p-4 border-t border-grey md:w-3/4 md:mx-auto">
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
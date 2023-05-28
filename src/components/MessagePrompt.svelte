<script lang="ts">
    export let messageGunRef: any;

    import type { Message } from "../types/types";
    import { nickname } from "$lib/stores/userStore";
    import sendIconUrl from "../svg/send-svgrepo-com.svg?url";

    let currentMessage: string = "";

    const sendMessage = () => {
        if (currentMessage != "") {
            const date = new Date();
            let newMessage: Message = {
                id: date.toISOString(),
                sender: $nickname,
                content: currentMessage,
                timestamp: `${date.toTimeString().slice(0, 8)}`,
            }
            messageGunRef.set(newMessage);
            currentMessage = "";
        }
	}

    const onPromptKeydown = (event: KeyboardEvent): void => {
		if (["Enter"].includes(event.code)) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="bg-surface-500/30 p-4 border-t border-grey ">
    <div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
        <!-- <button class="input-group-shim">+</button> -->
        <textarea
            bind:value={currentMessage}
            class="bg-transparent border-0 ring-0 p-3 pl-6 resize-none"
            name="prompt"
            id="prompt"
            placeholder="Share your thoughts!"
            rows="1"
            on:keydown={onPromptKeydown}
        />
        <button class="variant-filled-primary w-14" on:click={sendMessage}>
            <img src={sendIconUrl} class="w-10" alt="Send" />
        </button>
    </div>
</div>
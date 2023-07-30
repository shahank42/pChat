<script lang="ts">
	import type { Message } from '../types/types';

	import { nickname, roomDeleted } from '$lib/stores/userStore';

	import sendIconUrl from '../svg/send-svgrepo-com.svg?url';
	import type { ActionSender } from 'trystero';

  export let sendMessageAction: ActionSender<unknown>;
	export let pushMessageToMessageLog: (newMessage: Message) => void;
	 
	let currentMessage: string = '';

	const sendMessage = () => {
		if (currentMessage != '') {
			const date = new Date();
			let newMessage: Message = {
				type: "message",
				id: date.toISOString(),
				sender: $nickname,
				content: currentMessage,
				timestamp: `${date.toTimeString().slice(0, 8)}`
			};
			sendMessageAction(newMessage);
			pushMessageToMessageLog(newMessage);
			currentMessage = '';
		}
	};

	const onPromptKeydown = (event: KeyboardEvent): void => {
		if (['Enter'].includes(event.code)) {
			event.preventDefault();
			sendMessage();
		}
	};
</script>

<div class="border-grey border-t bg-surface-500/30 p-4">
	{#if $roomDeleted}
		<div class="input-group-divider input-group grid-cols-[1fr_auto] rounded-container-token">
			<!-- <button class="input-group-shim">+</button> -->

			<textarea
				class="resize-none border-0 bg-transparent p-3 pl-6 ring-0"
				name="prompt"
				id="prompt"
				placeholder="No messaging in destroyed rooms!"
				rows="1"
				disabled
			/>

			<button class="variant-filled-primary w-14" disabled>
				<img src={sendIconUrl} class="w-10" alt="Send" />
			</button>
		</div>
	{/if}

	{#if !$roomDeleted}
		<div class="input-group-divider input-group grid-cols-[1fr_auto] rounded-container-token">
			<!-- <button class="input-group-shim">+</button> -->

			<textarea
				bind:value={currentMessage}
				on:keydown={onPromptKeydown}
				class="resize-none border-0 bg-transparent p-3 pl-6 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Say something..."
				rows="1"
			/>

			<button class="variant-filled-primary w-14" on:click={sendMessage}>
				<img src={sendIconUrl} class="w-10" alt="Send" />
			</button>
		</div>
	{/if}
</div>

<script lang="ts">
	import type { Message } from '../types/types';

	import { nickname, gunRef, roomDeleted } from '$lib/stores/userStore';

	import sendIconUrl from '../svg/send-svgrepo-com.svg?url';

    
	let currentMessage: string = '';

	const sendMessage = () => {
		if (currentMessage != '') {
			const date = new Date();
			let newMessage: Message = {
				id: date.toISOString(),
				sender: $nickname,
				content: currentMessage,
				timestamp: `${date.toTimeString().slice(0, 8)}`
			};
			$gunRef.get('feed').get('messages').set(newMessage);
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
				rows="2"
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
				class="resize-none border-0 bg-transparent p-3 pl-6 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Share your thoughts (markdown supported!)"
				rows="2"
			/>

			<button class="variant-filled-primary w-14" on:click={sendMessage}>
				<img src={sendIconUrl} class="w-10" alt="Send" />
			</button>
		</div>
	{/if}
</div>

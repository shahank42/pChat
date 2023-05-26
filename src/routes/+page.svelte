<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { onMount } from "svelte";
	import MessageFeed from "../components/MessageFeed.svelte";

	

	// import { gun } from "../initGun.js";
	import Gun from "gun/gun";
	const gun = Gun();

	let currentMessage = '';
	let messages: any = [];

	gun.get("room0").map().on((message, key) => {
		if (message) {
			messages = [...messages, message];
		}
	});

	const sendMessage = () => {
		const messageRef = gun.get("room0");
		let timestamp = Date.now();
		let newMessage = {
			id: timestamp,
			sender: "shahank",
			content: currentMessage,
			timestamp: timestamp,
		}
		messageRef.set(newMessage);
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="space-y-5">
		<p>Room ID: room0</p>
	</div>

	<div class="h-full flex flex-col gap-1 w-full">
		<div class="bg-surface-500/30 p-4 overflow-y-auto h-full">
			<MessageFeed messages={messages} />
		</div>
		
		<div class="bg-surface-500/30 p-4">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
				<button class="input-group-shim">+</button>
				<textarea
					bind:value={currentMessage}
					class="bg-transparent border-0 ring-0 p-2"
					name="prompt"
					id="prompt"
					placeholder="Write a message..."
					rows="1"
				/>
				<button class="variant-filled-primary" on:click={sendMessage}>Send</button>
			</div>
		</div>
	</div>
</div>

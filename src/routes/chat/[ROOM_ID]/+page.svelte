<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	interface PageData {
		id: string;
	};

	interface Message {
		id: number;
		sender: string;
		content: string;
		timestamp: number;
	}

	export let data: PageData;

	import Gun from "gun/gun";
	import MessageFeed from "../../../components/MessageFeed.svelte";
	import { nickname } from "../../../lib/stores/userStore";

	const gun = Gun({
  		peers: [
    		"https://pchat-relay-test.shahank.repl.co/gun",
  		]
	});

	let ROOM_ID_DEV: string | null = data.id;
	const messageGunRef = gun.get(ROOM_ID_DEV);

	let currentMessage = '';
	let messages: Message[] = [];

	messageGunRef.map().once((message: any) => {
		if (message) {
			messages = [...messages, message];
		}
	});


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
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="mx-auto flex flex-row align-middle">
		Room ID: {ROOM_ID_DEV}
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

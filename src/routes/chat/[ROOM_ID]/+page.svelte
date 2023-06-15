<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import type { Message, PageData } from "../../../types/types";

	export let data: PageData;

	import { afterUpdate } from "svelte";
	import Gun from "gun/gun";
	import { nickname, roomID } from "$lib/stores/userStore";
	import MessageFeed from "../../../components/MessageFeed.svelte";
	import MessagePrompt from "../../../components/MessagePrompt.svelte";
	import NicknamePrompt from "../../../components/NicknamePrompt.svelte";

	let showChatInterface: boolean = ($nickname !== "");
	let messages: Message[] = [];
	let messageScrollNode: HTMLElement;
	$roomID = data.id;

	const toggleChatInterface = () => { showChatInterface = true; }
	
	const gun = Gun({
		peers: [
			"https://pchat-relay-test.shahank.repl.co/gun",
		]
	});
	
	const messageGunRef = gun.get($roomID);

	messageGunRef.map().once((message: any) => {
		if (message) {
			messages = [...messages, message];
		}
	});

    afterUpdate(() => {
        if (messages) messageScrollNode.scroll({ top: messageScrollNode.scrollHeight, behavior: 'smooth' });
    });
</script>



<main class="flex-1 flex flex-col overflow-y-scroll" bind:this={messageScrollNode}>
	{#if !showChatInterface}
		<NicknamePrompt toJoinRoom {toggleChatInterface} />
	{/if}

	<span class="w-full mx-auto left-0 right-0 flex flex-row align-middle justify-center absolute">
		<div class="border-l bg-surface-900 border-b border-r py-1 px-2 text-sm rounded-br-lg rounded-bl-lg">Room ID: {$roomID}</div>
	</span>

	{#if showChatInterface}
		<div class="bg-surface-500/30 p-4 flex-1 pt-8">
			<MessageFeed {messages} />
		</div>
	{/if}
</main>

	
{#if showChatInterface}
	<MessagePrompt {messageGunRef} />
{/if}


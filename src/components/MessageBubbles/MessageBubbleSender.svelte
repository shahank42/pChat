<script lang="ts">
	import type { Message } from '../../types/types';

	import SvelteMarkdown from 'svelte-markdown';

	export let message: Message;
</script>

<div class="ml-auto grid w-fit max-w-xl grid-cols-[1fr_auto] gap-2">
	<div class="flex flex-col">
		<header class="flex items-center justify-between">
			<p class="ml-auto text-sm font-bold md:text-base">{message.sender}</p>
		</header>

		<div
			class="card border-grey variant-soft mt-1 space-y-1 rounded-tr-none border px-4 py-2 pb-3 pt-1"
		>
			<p class="prose prose-sm hyphens-auto break-all text-sm md:prose-base md:text-base">
				<SvelteMarkdown source={message.content} />
			</p>
		</div>
	</div>

	<div class="flex flex-col">
		<img
			src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${message.sender}`}
			alt="avatar"
			class="mx-auto w-10 rounded-lg"
		/>
		<small class="pt-2 text-xs text-tertiary-800">{message.timestamp}</small>
	</div>
</div>

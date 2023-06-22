<script lang="ts">
	import type { Message } from '../../types/types';

	import SvelteMarkdown from 'svelte-markdown';

	export let message: Message;
</script>

<div class="mr-auto grid w-fit max-w-xl grid-cols-[auto_1fr] gap-2">
	<div class="flex flex-col">
		<img
			src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${message.sender}`}
			alt="avatar"
			class="mx-auto w-10 rounded-lg"
		/>
		<small class="pt-2 text-xs text-tertiary-800">{message.timestamp}</small>
	</div>

	<div class="flex flex-col">
		<header class="flex items-center justify-between">
			<p class="text-sm font-bold md:text-base">{message.sender}</p>
		</header>

		<div
			class="card variant-soft-primary border-grey mt-1 space-y-1 rounded-tl-none border px-4 py-2 pb-3 pt-1"
		>
			<p class="prose prose-sm hyphens-auto break-all text-sm md:prose-base md:text-base">
				<SvelteMarkdown source={message.content} />
			</p>
		</div>
	</div>
</div>

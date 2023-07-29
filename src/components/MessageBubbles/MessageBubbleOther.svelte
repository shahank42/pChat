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
			<p class="mb-1 text-sm font-bold md:text-base">{message.sender}</p>
		</header>

		<div class="card border-grey variant-soft-primary rounded-tl-none border">
			<p
				class="prose prose-sm mt-0 hyphens-auto break-all px-3 py-1 text-sm md:prose-base md:px-4 md:py-2 md:text-base"
			>
				<SvelteMarkdown source={message.content} />
			</p>
		</div>
	</div>
</div>

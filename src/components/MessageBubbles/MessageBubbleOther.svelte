<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
	import type { Message } from "../../types/types";

    export let message: Message;
</script>

<div class="grid grid-cols-[auto_1fr] gap-2 max-w-xl w-fit mr-auto">
    <div class="flex flex-col">
        <img src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${message.sender}`} alt="avatar" class="w-10 rounded-lg mx-auto" />
        <small class="text-xs pt-2 text-tertiary-800">{message.timestamp}</small>
    </div>

    <div class="flex flex-col">
        <header class="flex justify-between items-center">
            <p class="font-bold text-sm md:text-base">{message.sender}</p>
        </header>
        <div class="card px-4 py-2 pt-1 pb-3 variant-soft-primary rounded-tl-none space-y-1 border border-grey mt-1">    
            <p class="prose prose-sm md:prose-base text-sm md:text-base break-all hyphens-auto">
                <SvelteMarkdown source={message.content} />
            </p>
        </div>
    </div>
</div>
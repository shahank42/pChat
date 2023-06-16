<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
	import type { Message } from "../../types/types";

    export let message: Message;
</script>

<div class="grid grid-cols-[1fr_auto] gap-2 max-w-xl w-fit ml-auto">
    <div class="flex flex-col">
        <header class="flex justify-between items-center">
            <p class="font-bold text-sm md:text-base ml-auto">{message.sender}</p>
        </header>
        <div class="card px-4 py-2 pt-1 pb-3 variant-soft rounded-tr-none space-y-1 border border-grey mt-1">    
            <p class="prose text-sm md:text-base">
                <SvelteMarkdown source={message.content} />
            </p>
        </div>
    </div>
    <div class="flex flex-col">
        <img src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${message.sender}`} alt="avatar" class="w-10 rounded-lg mx-auto" />
        <small class="text-xs pt-2 text-tertiary-800">{message.timestamp}</small>
    </div>
</div>
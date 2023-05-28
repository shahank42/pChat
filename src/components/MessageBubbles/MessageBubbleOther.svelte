<script lang="ts">
	import type { Message } from "../../types/types";

    export let message: Message;
</script>

<div class="grid grid-cols-[auto_1fr] gap-2 max-w-xl mr-auto">
    <div class="flex flex-col">
        <img src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${message.sender}`} alt="avatar" class="w-10 rounded-lg mx-auto" />
        <small class="text-xs pt-2 text-tertiary-800">{message.timestamp}</small>
    </div>
    <div class="card px-4 pt-2 pb-3 variant-soft-primary rounded-tl-none space-y-1 border border-grey mt-6">
        <header class="flex justify-between items-center">
            <p class="font-bold">{message.sender}</p>
        </header>
        <p class="">{message.content}</p>
    </div>
</div>
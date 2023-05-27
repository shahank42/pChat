<script lang="ts">
	import type { Message } from "../../types/types";

    export let message: Message;
</script>

<div class="grid grid-cols-[auto_1fr] gap-2">
    <img src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${message.sender}`} alt="avatar" class="w-10 rounded-lg" />
    <div class="card p-4 variant-soft rounded-tl-none space-y-2">
        <header class="flex justify-between items-center">
            <p class="font-bold">{message.sender}</p>
            <small class="opacity-50">{message.timestamp}</small>
        </header>
        <p>{message.content}</p>
    </div>
</div>
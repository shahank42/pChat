<script lang="ts">
	import type { Message } from "../../types/types";

    export let message: Message;
</script>

<div class="grid grid-cols-[auto_1fr] gap-2 max-w-xl mr-auto">
    <img src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${message.sender}`} alt="avatar" class="w-10 rounded-lg" />
    <div class="card p-4 variant-soft-primary rounded-tl-none space-y-2 border border-grey mt-6">
        <header class="flex justify-between items-center">
            <p class="font-bold">{message.sender}</p>
            <small>{message.timestamp}</small>
        </header>
        <p>{message.content}</p>
    </div>
</div>
<script lang="ts">
	import type { Message } from '../types/types';

	export let message: Message;
</script>

<div class="flex w-full justify-center py-1">
	<span
		class={`rounded-full px-4 py-1 text-xs md:text-sm ${
			message.type === 'status-joined' ? 'bg-secondary-800' : 'bg-primary-700'
		}`}>{message.content}</span
	>
</div>

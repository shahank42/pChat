<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { nickname } from "../lib/stores/userStore.js";
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">	
	<label class="label w-3/4 md:w-1/2">
		<span>Nickname:</span>
		<input class="input w-full p-4 h-10" type="text" placeholder="Choose nickname..." bind:value={$nickname}/>
	</label>
	
	<a href={`/chat/${crypto.randomUUID()}`} class="btn variant-filled w-3/4 md:w-1/2 mt-5">Create pChat Room</a>
</div>

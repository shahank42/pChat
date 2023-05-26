<script lang="ts">
    export let messages: any;
</script>

<section class="w-full max-h-[400px] p-4 overflow-y-auto space-y-4">
    {#each messages as message}
        <div>
            {message.timestamp} <br />
            <strong>{message.sender}:</strong> {message.content}
        </div>
        
    {/each}
</section>
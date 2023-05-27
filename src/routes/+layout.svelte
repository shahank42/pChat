<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
</script>

<div class="flex flex-col h-screen overflow-hidden">
    <header class="w-full text-center border-b border-grey p-4">pChat</header>
	<slot />
    <footer class="w-full text-center border-t border-grey p-1">
		<p class="text-sm">made by shahank</p>
	</footer>
</div>
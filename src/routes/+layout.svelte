<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { Toast } from '@skeletonlabs/skeleton';
</script>

<div class="flex flex-col h-[100dvh] md:w-3/4 md:mx-auto overflow-hidden md:border-l md:border-r">
	<Toast position="t" />
    <header class="w-full text-center border-b border-grey p-4"><a href="/">pChat</a></header>
	<slot />
    <footer class="w-full text-center border-t border-grey p-1">
		<p class="text-sm">made by shahank</p>
	</footer>
</div>
<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- <div class="grid grid-cols-[auto_1fr]"> -->
<div>
	<Sidebar />

	<!-- <main class="render"> -->
	<main>
		{@render children()}
	</main>
</div>

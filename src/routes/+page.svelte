<script lang="ts">
	import { onMount } from 'svelte';
	import type { ScriptParameter } from '../model/script';
	import Table from '../view/table.svelte';

	let param: ScriptParameter | undefined;

	onMount(async () => {
		// encodeURIComponent()
		const hash = document.location.hash;
		if (hash) {
			console.log(hash.substring(1));
			const decoded = decodeURIComponent(hash.substring(1));
			const data = JSON.parse(decoded);
			param = data;
		}
	});
</script>

{#if param}
	<Table
		tragedySet={param.tragedy}
		charsName={param.characters}
		incidentsMapping={param.incident}
	/>
{/if}

<style>
</style>

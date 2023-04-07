<script lang="ts">
	import { scripts } from '../../../model/script';
	import type { ScriptNames } from '../../../model/script';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	$: name = $page.params['scriptName'] as ScriptNames;

	$: script = scripts[name];
	let host = '';
	let protocoll = '';

	onMount(() => {
		host = document.location.host;
		protocoll = document.location.protocol;
	});
</script>

{#if script}
	<h1>{script.titel}</h1>
	{#if host}
		<a
			href={`${protocoll}//${host}/#${encodeURIComponent(
				JSON.stringify({
					tragedy: script.tragedySet,
					characters: script.characters.map((x) => x.cast),
					incident: script.incidents.map((x) => ({
						day: x.day,
						incident: x.incident
					}))
				})
			)}`}
			target="_blank">Link to Player Aid</a
		>
	{/if}
{/if}

<style>
</style>

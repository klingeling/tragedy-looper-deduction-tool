<script lang="ts">
	import { scripts, type Script, isScriptName } from '../../../model/script';
	import type { ScriptNames } from '../../../model/script';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { keys } from '../../../misc';

	$: name = $page.params['scriptName'];

	let script: Script | undefined;
	$: {
		if (isScriptName(name)) {
			script = scripts[name];
		}
	}

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
					characters: Object.keys(script.cast),
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

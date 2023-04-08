<script lang="ts">
	import type { scripts, Script, isScriptName, ScriptParameter } from '../../model/script';

	import { onMount } from 'svelte';
	
	import type { CharacterNames } from '../../model/characters';

	export let script: Script;

	$: parameter = script
		? ({
				tragedy: script.tragedySet,
				characters: Object.keys(script.cast) as CharacterNames[],
				incident: script.incidents.map((x) => ({
					day: x.day,
					incident: x.incident
				})),
				spectalRules: script.specialRules ? [script.specialRules] : undefined
		  } satisfies ScriptParameter)
		: undefined;
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
			href={`${protocoll}//${host}/#${encodeURIComponent(JSON.stringify(parameter))}`}
			target="_blank">Link to Player Aid</a
		>
	{/if}
{/if}

<style>
</style>

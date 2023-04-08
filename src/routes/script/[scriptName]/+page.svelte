<script lang="ts">
	import { scripts, type Script, isScriptName, type ScriptParameter } from '../../../model/script';
	import type { ScriptNames } from '../../../model/script';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { keys } from '../../../misc';
	import type { CharacterNames } from '../../../model/characters';

	$: name = $page.params['scriptName'];

	let script: Script | undefined;
	$: {
		if (isScriptName(name)) {
			script = scripts[name];
		}
	}

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

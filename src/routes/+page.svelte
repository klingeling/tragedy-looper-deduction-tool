<script lang="ts">
	import { onMount } from 'svelte';
	import type { ScriptIncidentPlayer, ScriptParameter } from '../model/script';
	import Table from '../view/table.svelte';
	import type { CharacterName } from '../model/characters';
	import type { TragedySetName } from '../model/tragedySets';
	import { parseSearchForPlayerAid } from '../serilezer';

	let param: ScriptParameter | undefined;

	let searchParams: URLSearchParams | undefined;
	onMount(() => {
		searchParams = new URLSearchParams(document.location.search);
		const pushState = history.pushState;
		history.pushState = function (data: any, unused: string, url?: string | URL | null) {
			pushState.apply(history, [data, unused, url]);
			searchParams = new URLSearchParams(document.location.search);
		};
	});

	let tragedySet: TragedySetName | undefined;
	let cast: CharacterName[] | undefined;
	let incidents: ScriptIncidentPlayer[] | undefined;
	let specialRules: string[] | undefined;
	$: [tragedySet, cast, incidents, specialRules] = parseSearchForPlayerAid(searchParams);
</script>

{#if tragedySet && cast && incidents && specialRules}
	<Table {tragedySet} {cast} {incidents} {specialRules} />
{:else}
	<h1>Tragedy Looper Deduction overview</h1>
	<p>
		If your are the Mastermind <a href="script">choose a script (SPOILER!!)</a>.
	</p>
	<p>Otherwise ask your Mastermind to choose a script and send you the link.</p>
{/if}

<style>
</style>

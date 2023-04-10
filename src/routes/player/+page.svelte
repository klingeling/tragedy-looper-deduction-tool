<script lang="ts">
	import { onMount } from 'svelte';
	import type { ScriptIncidentPlayer, ScriptParameter } from '../../model/script';
	import Table from '../../view/table.svelte';
	import type { CharacterName } from '../../model/characters';
	import type { TragedySetName } from '../../model/tragedySets';
	import { parseSearchForPlayerAid } from '../../serilezer';
	import { base } from '$app/paths';
	

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
	$: tablet = (searchParams?.get('tablet')?.toLocaleLowerCase() ?? 'false') !== 'false';
</script>

{#if tragedySet && cast && incidents && specialRules}
	<Table {tragedySet} {cast} {incidents} {specialRules} {tablet} />
{:else}
	<h1>Tragedy Looper Deduction overview</h1>
	<p>
		No correct script transmitted
	</p>

{/if}

<style>
</style>

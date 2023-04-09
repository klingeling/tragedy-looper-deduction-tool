<script lang="ts">
	import { distinct, join, keys } from '../../misc';
	import { scripts as scriptLookup, type Script, isScriptName } from '../../model/script';
	import { page } from '$app/stores';
	import ScriptDetails from './scriptDetails.svelte';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { stringifySearchForPlayerAid } from '../../serilezer';

	$: scripts = Object.values(scriptLookup);

	let selectedScript: Script | undefined;

	let searchParams: URLSearchParams | undefined;

	onMount(() => {
		searchParams = new URLSearchParams(document.location.search);
		const pushState = history.pushState;
		history.pushState = function (data: any, unused: string, url?: string | URL | null) {
			pushState.apply(history, [data, unused, url]);
			searchParams = new URLSearchParams(document.location.search);
		};
	});

	$: setNumber = parseInt(searchParams?.get('setNumber') ?? '-1');
	$: setName = searchParams?.get('setName');
	$: title = searchParams?.get('title');
	$: author = searchParams?.get('author');

	$: {
		if (setName && setNumber > -1) {
			selectedScript = scripts.filter(
				(x) => x.set?.name == setName && x.set?.number == setNumber
			)[0];
		} else if (isScriptName(title)) {
			selectedScript = scriptLookup[title];
		}
	}

</script>

{#if selectedScript}
	<ScriptDetails script={selectedScript} />

	<h1>Other Scripts</h1>
{/if}

{#each distinct(scripts
		.map((key) => key.set?.name)
		.sort( (a, b) => (a == undefined ? (b == undefined ? 0 : -1) : b == undefined ? 1 : a.localeCompare(b)) )) as set}
	<h2>{set ?? 'Independent'}</h2>
	{#each scripts
		.filter((x) => x.set?.name == set)
		.sort((a, b) => (a.set?.number ?? 0) - (b.set?.number ?? 0)) as s}
		{#if s}
			<div>
				<a href={`${base}/script/?title=${encodeURIComponent(s.titel)}`}
					>{s.set?.number ?? ''}
					{s.titel} by {s.creator} [{s.tragedySet}] difficulty {join(
						s.difficultySets.map((x) => x.difficulty.toString()),
						' / '
					)}</a
				>
			</div>
		{/if}
	{/each}
{/each}

<style>
</style>

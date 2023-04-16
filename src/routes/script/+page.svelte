<script lang="ts">
	import { distinct, join, keys } from '../../misc';
	import { scripts as scriptLookup, type Script, isScriptName } from '../../model/script';
	import { page } from '$app/stores';
	import ScriptDetails from './scriptDetails.svelte';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import '@picocss/pico/css/pico.css';
	import CustomScript from './customScript/CustomScript.svelte';

	$: scripts = Object.values(scriptLookup);

	let selectedScript: Script | undefined;

	let searchParams: URLSearchParams | undefined;

	let ownScripts: Script[] = [];
	onMount(() => {
		searchParams = new URLSearchParams(document.location.search);
		const pushState = history.pushState;
		history.pushState = function (data: any, unused: string, url?: string | URL | null) {
			pushState.apply(history, [data, unused, url]);
			searchParams = new URLSearchParams(document.location.search);
		};

		const localStorage = window.localStorage;
		if (localStorage)
			ownScripts = Array.from(localStorage)
				.map((_, i) => {
					const key = localStorage.key(i);
					if (key) {
						const data = localStorage.getItem(key);
						if (data) {
							const json = JSON.parse(data);
							return json;
						}
					}
				})
				.filter((x) => x && 'titel' in x);
	});

	$: setNumber = parseInt(searchParams?.get('setNumber') ?? '-1');
	$: setName = searchParams?.get('setName');
	$: title = searchParams?.get('title');
	$: author = searchParams?.get('author');

	$: serilizedScript = searchParams?.get('script');

	$: {
		if (setName && setNumber > -1) {
			selectedScript = scripts.filter(
				(x) => x.set?.name == setName && x.set?.number == setNumber
			)[0];
		} else if (isScriptName(title)) {
			selectedScript = scriptLookup[title];
		} else if (serilizedScript != undefined) {
			selectedScript = JSON.parse(serilizedScript);
		}
	}
</script>

<main class="container">
	<!-- <main class="container"> -->
	{#if selectedScript}
		<article>
			<ScriptDetails script={selectedScript} />
		</article>
	{/if}

	<a role="button" href={`${base}/script/customScript/`}>Create your own</a>
	<h1>…or use other Scripts</h1>

	{#if ownScripts.length > 0}
		<article>
			<header>
				<h2>Your Creations</h2>
			</header>
			{#each ownScripts as s}
				<div>
					<a href={`${base}/script/?script=${encodeURIComponent(JSON.stringify(s))}`}
						>{s.set?.number ?? ''}
						{s.titel} by {s.creator} [{s.tragedySet}] difficulty {join(
							s.difficultySets.map((x) => x.difficulty.toString()),
							' / '
						)}</a
					>
				</div>
			{/each}
		</article>
	{/if}

	{#each distinct(scripts
			.map((key) => key.set?.name)
			.sort( (a, b) => (a == undefined ? (b == undefined ? 0 : -1) : b == undefined ? 1 : a.localeCompare(b)) )) as set}
		<article>
			<header>
				<h2>{set ?? 'Independent'}</h2>
			</header>
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
		</article>
	{/each}

	<!-- </main> -->
</main>

<style>
</style>

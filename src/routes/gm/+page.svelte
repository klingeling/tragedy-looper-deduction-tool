<script lang="ts">
	import { distinct, join, keys } from '../../misc';
	import { scripts as scriptLookup, type Script, isScriptName } from '../../model/script';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import '@picocss/pico/css/pico.css';

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

<div>Work in Progre🏗️</div>
<h1>Mastermind Aid</h1>

{#if selectedScript}
	{selectedScript.titel}
{/if}


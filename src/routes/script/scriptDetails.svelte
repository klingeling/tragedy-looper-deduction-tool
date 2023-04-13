<script lang="ts">
	import {
		type scripts,
		type Script,
		type isScriptName,
		toPlayerIncident
	} from '../../model/script';

	import { onMount } from 'svelte';

	import { characterscomesInLater, type CharacterName } from '../../model/characters';
	import { stringifySearchForPlayerAid } from '../../serilezer';
	import { distinct, keys } from '../../misc';
	import { base } from '$app/paths';
	import Option from './customScript/option.svelte';
	export let script: Script;

	let alwaysTransmitCharacters: boolean[] = characterscomesInLater.map(() => true);
	$: allAdditionamCharacters = alwaysTransmitCharacters.every((x) => x == true)
		? true
		: alwaysTransmitCharacters.every((x) => x == false)
		? false
		: undefined;

	function swtchAllCharacters() {
		const target = allAdditionamCharacters !== true;
		for (let i = 0; i < alwaysTransmitCharacters.length; i++) {
			alwaysTransmitCharacters[i] = target;
		}
	}

	$: additionalCharacters = alwaysTransmitCharacters
		.map((b, i) => [b, characterscomesInLater[i]] as const)
		.filter(([x]) => x)
		.map(([, x]) => x);

	function getParams(script: Script, additionalCharacters: CharacterName[]) {
		return stringifySearchForPlayerAid(
			script.tragedySet,
			distinct(keys(script.cast).concat(additionalCharacters)),
			script.incidents.map(toPlayerIncident),
			script.specialRules ? [script.specialRules] : []
		).toString();
	}

	$: parameter = script ? getParams(script, additionalCharacters) : undefined;
	let host = '';
	let protocoll = '';

	onMount(() => {
		host = document.location.host;
		protocoll = document.location.protocol;
	});
	async function share(shareLink: string, titel: string, text: string) {
		const shareData = {
			title: titel,
			text: text,
			url: shareLink
		};

		const isSharable = navigator.canShare(shareData);
		if (isSharable) {
			try {
				await navigator.share(shareData);
				return;
			} catch (error) {
				console.error(error);
			}
		}
		try {
			await navigator.clipboard.writeText(shareLink);
			message = `Copied <a href='${shareLink}' target='_blank' >Link</a> to Clipboard.`;
			return;
		} catch (error) {
			console.error(error);
		}
		message = `Please copy the <a href='${shareLink}' target='_blank' >Link</a> and share it.`;
	}
	let message: string | undefined;
</script>

<dialog open={message !== undefined}>
	<div>
		{@html message}
		<button on:click={() => (message = undefined)}>Close</button>
	</div>
</dialog>

{#if script}
	<a
		aria-disabled={script == undefined}
		href={`${base}/script/customScript/?script=${encodeURIComponent(JSON.stringify(script))}`}
		class="outline"
		style="float: right; width: fit-content;"
		role="button">Edit</a
	>
	<button
		disabled={script == undefined}
		class="outline"
		on:click={() =>
			share(
				`${base}/script/?script=${encodeURIComponent(JSON.stringify(script))}`,
				script.titel,
				'A Tragedy Looper Script'
			)}
		style="float: right; width: fit-content; margin-right: 1em;"
		>Share Script
	</button>
	<button
		disabled={script == undefined}
		class="outline"
		on:click={() =>
			share(`${base}/player/?${parameter}`, 'Player Aid', 'A Tragedy Looper Player Aid')}
		style="float: right; width: fit-content;  clear: right;"
		>Share Player Aid
	</button>
	<!-- <span style="clear: right;"></span> -->
	<!-- <a style="float: right; clear: right;" href={`${base}/player/?${parameter}`} target="_blank"
		>Link to Script specific Player Aid</a
	> -->
	<!-- <button class="outline" style="float: right; width: fit-content;">Edit</button> -->
	<header>
		<hgroup>
			<h4>{script.creator}</h4>
			<h1>{script.titel}</h1>

			{#if script.set}
				<h2>({script.set.number}) {script.set.name}</h2>
			{/if}
		</hgroup>
	</header>

	{#each script.difficultySets as e}
		<div>
			Loops: {e.numberOfLoops} / difficulty:
			{#each Array.from({ length: e.difficulty }) as d}<div
					style="width: 1em; height: 1em; background-color: var(--primary); display: inline-block; border-radius: 1em; border: 1px solid var(--secondary)"
				/>{/each}{#each Array.from({ length: 8 - e.difficulty }) as d}<div
					style="width: 1em; height: 1em; background-color: transparent; border: 1px solid var(--secondary); display: inline-block; border-radius: 1em;"
				/>{/each} ({e.difficulty})
		</div>
	{/each}
	<div>
		<strong>{script.tragedySet}</strong>
	</div>
	<div style="display: grid; justify-content: start; align-content:  baseline; gap: 0.3em;">
		<strong style="grid-column: 1; grid-row: 1;">Main Plot:</strong>
		<span style="grid-column: 2; grid-row: 1;">{script.mainPlot}</span>
		<strong style="grid-column: 1; grid-row: 2;">Sub Plot :</strong>
		{#each script.subPlots as s, i}
			<span style="grid-column: 2; grid-row: {i + 2};">
				{#if typeof s == 'string'}
					{s}
				{:else}
					{s[0]}
					<small>
						{#each Object.entries(s[1]) as [key, value]}
							<br />
							({key}: {value})
						{/each}
					</small>
				{/if}
			</span>
		{/each}
	</div>

	<div>
		<table>
			<thead>
				<th>Cast</th>
				<th>Role</th>
			</thead>
			<tbody>
				{#each Object.entries(script.cast) as [cast, role]}
					<tr>
						<td>
							{cast}
						</td>
						<td>
							{#if Array.isArray(role)}
								{role[0]}
								{#each Object.entries(role[1]) as [key, value]}
									<br />
									{key}: {value}
								{/each}
							{:else}
								{role}
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div>
		<table>
			<thead>
				<th>Day</th>
				<th>Incident</th>
				<th>Culprit</th>
			</thead>
			<tbody>
				{#each script.incidents as { day, incident, culprit }}
					<tr>
						<td>
							{day}
						</td>
						<td>
							{#if Array.isArray(incident)}
								{incident[0]}<br />
								<small>
									({incident[1]})
								</small>
							{:else}
								{incident}
							{/if}
						</td>
						<td>
							{culprit}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{#if script.specialRules}
		<h5>Special Rules</h5>
		<div>
			{script.specialRules}
		</div>
	{/if}
	<div>
		<h5>Specifics</h5>
		{script.specifics}
	</div>
	<div>
		<h5>Story</h5>
		{script.story}
	</div>
	<div>
		<h5>Hints for the Mastermind</h5>
		{script.mastermindHints}
	</div>
	<hr />
	<div>
		{#if host}
			<strong>Always include suprise characters</strong>
			<input
				type="checkbox"
				on:click={(e) => {
					// e.preventDefault();
					swtchAllCharacters();
				}}
				bind:checked={allAdditionamCharacters}
				indeterminate={allAdditionamCharacters === undefined}
			/>
			<ul>
				{#each characterscomesInLater as a, i}
					<li>
						<lable>
							<input type="checkbox" role="switch" bind:checked={alwaysTransmitCharacters[i]} />
							{a}
						</lable>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

<style>
</style>

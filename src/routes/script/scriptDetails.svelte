<script lang="ts">
	import type { scripts, Script, isScriptName, ScriptParameter } from '../../model/script';

	import { onMount } from 'svelte';

	import type { CharacterNames } from '../../model/characters';
	import { incidents } from '../../model/incidents';

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
	<h3>{script.creator}</h3>
	<h1>{script.titel}</h1>

	{#if script.set}
		<h3>({script.set.number}) {script.set.name}</h3>
	{/if}

	{#each script.difficultySets as e}
		<div>
			Loops: {e.numberOfLoops} / difficulty:
			{#each Array.from({ length: e.difficulty }) as d}<div
					style="width: 1em; height: 1em; background-color: blue; display: inline-block; border-radius: 1em;"
				/>{/each}{#each Array.from({ length: 8 - e.difficulty }) as d}<div
					style="width: 1em; height: 1em; background-color: transparent; border: 1px solid blue; display: inline-block; border-radius: 1em;"
				/>{/each} ({e.difficulty})
		</div>
	{/each}
	<div>
		<strong>{script.tragedySet}</strong>
	</div>
	<div style="display: grid; justify-content: start; align-content:  baseline;">
		<strong style="grid-column: 1; grid-row: 1;">Main Plot:</strong>:
		<span style="grid-column: 2; grid-row: 1;">{script.mainPlot}</span>
		<strong style="grid-column: 1; grid-row: 2;">Sub Plot :</strong>:
		{#each script.subPlots as s, i}
			<span style="grid-column: 2; grid-row: {i + 2};">
				{s}
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
								{role[0]} ({role[1]})
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
							{incident}
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
<hr>
	<div>
		{#if host}
			<a
				href={`${protocoll}//${host}/#${encodeURIComponent(JSON.stringify(parameter))}`}
				target="_blank">Link to Script specific Player Aid</a
			>
		{/if}
	</div>
{/if}

<style>
</style>

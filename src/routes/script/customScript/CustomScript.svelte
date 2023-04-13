<script lang="ts">
	import { object_without_properties } from 'svelte/internal';
	import { fromEntries, keys } from '../../../misc';
	import { plots, type Plot, type PlotName } from '../../../model/plots';
	import type { RoleName } from '../../../model/roles';
	import { tragedySets, type TragedySet, type TragedySets } from '../../../model/tragedySets';
	import {
		characters,
		type Character,
		type CharacterName,
		isCharacterPlotless
	} from '../../../model/characters';

	import { CustomScript } from '../../../model/customScript';
	import PlotSelection from './plotSelection.svelte';
	import RoleGroup from './roleGroup.svelte';
	import Incedent from './incedents.svelte';
	import Difficulty from './difficulty.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	const model = new CustomScript();

	const tragedySetName = model.tragedySetName;
	const tragedySet = model.tragedySet;
	const mainPlots = model.mainPlots;
	const subPlots = model.subPlots;

	const rolesGroup = model.roles;
	const days = model.daysPerLoop;

	const title = model.title;
	const creator = model.creator;
	const difSet = model.difficultySets;

	let exportJson: string | undefined;
</script>

<dialog open={exportJson !== undefined}>
	<form>
		<textarea
			style="height: calc(100vh - 10rem); width: calc(100vw -  2 * var(--block-spacing-horizontal))"
			readonly>{exportJson}</textarea
		>
		<button on:click={() => (exportJson = undefined)}>Close</button>
	</form>
</dialog>

<label>
	Title
	<input type="text" bind:value={$title} />
</label>
<label>
	Creator
	<input type="text" bind:value={$creator} />
</label>

<h2>Tragedy Set</h2>
<select bind:value={$tragedySetName}>
	{#each keys(tragedySets) as tgs}
		<option value={tgs}>{tgs}</option>
	{/each}
</select>

{#if $tragedySet['numberOfMainPlots'] > 1}
	<h2>Main Plots</h2>
{:else}
	<h2>Main Plot</h2>
{/if}
{#each $mainPlots as plotSelection}
	<PlotSelection {plotSelection} />
{/each}
{#if $tragedySet['numberOfSubPlots'] > 1}
	<h2>Sub Plots</h2>
{:else}
	<h2>Sub Plot</h2>
{/if}
{#each $subPlots as plotSelection}
	<PlotSelection {plotSelection} />
{/each}

<h2>Dificulty</h2>

<Difficulty {difSet} />

<h2>Days</h2>
<input type="number" bind:value={$days} />

<h2>Roles</h2>
{#each $rolesGroup as group}
	<RoleGroup {group} />
{/each}
<h2>Incidents</h2>
<Incedent incedentGroup={model.incidentGroup} />

<div class="grid">

	<button on:click={() => (exportJson = JSON.stringify(model.export(), undefined, 2))}>Export</button>
	<button on:click={() => window.open(`${base}/script/?script=${encodeURIComponent(
		JSON.stringify(model.export())
		)}`,'_blank')}>Open</button>
		</div>


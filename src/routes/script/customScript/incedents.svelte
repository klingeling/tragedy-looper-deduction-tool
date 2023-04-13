<script lang="ts">
	import type { CharacterName } from '../../../model/characters';
	import type { ICustomScriptIncidentSelectionGroup } from '../../../model/customScript';
	import Incedent from './incedent.svelte';

	export let incedentGroup: ICustomScriptIncidentSelectionGroup<CharacterName>;

	$: numberOfIncidetns = incedentGroup.selectedNumber;
	$: incidents = incedentGroup.selectors;
	$: maxIncedents = incedentGroup.script.daysPerLoop;
</script>

<label>
	Number of Incedents
	<input type="number" bind:value={$numberOfIncidetns} max={$maxIncedents} />
</label>

<table>
	<thead>
		<th>Day</th>
		<th>Incident</th>
		<th>Culprit</th>
		<th>Options</th>
	</thead>
	<tbody>
		{#each $incidents as incident}
			<Incedent {incident} />
		{/each}
	</tbody>
</table>

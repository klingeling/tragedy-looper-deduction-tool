<script lang="ts">
	import type { CharacterName } from '../../../../model/characters';
	import type { ICustomScriptIncidentSelection } from '../../../../model/customScript';
	import Option from './option.svelte';

	export let incident: ICustomScriptIncidentSelection<CharacterName>;

	$: availableCharacters = incident.availableCharacters;
	$: availableDays = incident.availableDays;
	$: options = incident.options;
	$: selectedCharacter = incident.selectedCharacter;
	$: selectedDay = incident.selectedDay;
	$: selectedIncident = incident.selectedIncident;
	$: allIncidents = incident.script.incidents;
</script>

<tr>
	<td>
		<select bind:value={$selectedDay}>
			{#each $availableDays as day}
				<option>{day}</option>
			{/each}
		</select>
	</td>
	<td>
		<select bind:value={$selectedIncident}>
			{#each $allIncidents as day}
				<option>{day}</option>
			{/each}
		</select>
	</td>
	<td>
		<select bind:value={$selectedCharacter}>
			{#each $availableCharacters as day}
				<option>{day}</option>
			{/each}
		</select>
	</td>
	<td>
		{#each $options as option}
			<Option {option} />
		{/each}
	</td>
</tr>

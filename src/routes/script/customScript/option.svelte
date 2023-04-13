<script lang="ts">
	import { characters } from '../../../model/characters';
	import type { AdditionalOptions } from '../../../model/customScript';

	export let option: AdditionalOptions;

	$: selection = option.value;

	$: tragedySet = option.script.tragedySet;
	$: selectodPlots = option.script.selectedPlots;
	$: otherPlots = [...$tragedySet.mainPlots, ...$tragedySet.subPlots];

	$: incidents = option.script.incidents;
	$: unusedRoles = option.script.unusedRoles;

	let viewOptional = false;
	$: {
		if (!viewOptional) {
			$selection = undefined;
		}
	}
</script>

<div>
	{#if option.option.type == 'text' || option.option.type == 'number'}
		{#if option.option.optional === true}
			<input type="checkbox" role="switch" bind:checked={viewOptional} />
		{/if}
		{option.option.name}
		{#if option.option.optional !== true || viewOptional}
			{#if option.option.type == 'number'}
				<input bind:value={$selection} type="number" />
			{:else if option.option.type == 'text'}
				<input bind:value={$selection} type="text" />
			{/if}
		{/if}
	{:else}
		{option.option.name}

		<select bind:value={$selection}>
			{#if option.option.optional == true}
				<option value={undefined}>Not Set</option>
			{/if}
			{#if option.option.type == 'plot'}
				{#each otherPlots.filter((p) => !$selectodPlots.includes(p)) as p}
					<option value={p}>{p}</option>
				{/each}
			{:else if option.option.type == 'character'}
				{#each option.script.characters as p}
					<option value={p}>{p}</option>
				{/each}
			{:else if option.option.type == 'location'}
				{#each option.script.locations as p}
					<option value={p}>{p}</option>
				{/each}
			{:else if option.option.type == 'incident'}
				{#each $incidents as p}
					<option value={p}>{p}</option>
				{/each}
			{:else if option.option.type == 'role'}
				{#each $unusedRoles as p}
					<option value={p}>{p}</option>
				{/each}
			{/if}
		</select>
	{/if}
</div>

<script lang="ts">
	import type { CharacterName } from '../../../../model/characters';
	import type { ICustomScriptRoleExclusiveSelectionGroup } from '../../../../model/customScript';
	import RoleSelect from './roleSelect.svelte';

	export let group: ICustomScriptRoleExclusiveSelectionGroup<CharacterName>;
	$: numberOfRoles = group.selectedNumber;
	$: selectors = group.selectors;
</script>

<h3>
	{group.role}
</h3>

{#if group.min !== group.max}
	<label>
		Number of {group.role}'s
		<input type="number" bind:value={$numberOfRoles} min={group.min} max={group.max} />
	</label>
{/if}

{#each $selectors as role}
	<RoleSelect {role} />
{/each}

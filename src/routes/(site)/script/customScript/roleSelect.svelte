<script lang="ts">
	import type { CharacterName } from '../../../../model/characters';
	import type { ICustomScriptRoleExclusiveSelection } from '../../../../model/customScript';
	import Option from './option.svelte';

	export let role: ICustomScriptRoleExclusiveSelection<CharacterName>;
	$: selectedCharacter = role.selectedCharacter;
	$: availableCharacters = role.availableCharacters;

	$: options = role.options;
</script>

<select bind:value={$selectedCharacter}>
	{#each $availableCharacters as c}
		<option value={c}>{c}</option>
	{/each}
</select>
{#each $options as option}
	<Option {option} />
{/each}
<hr />

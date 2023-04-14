<script lang="ts">
	import { join, require, showAll } from '../misc';
	import type { Abilitie } from '../model/roles';

	export let a: Abilitie;
	$: ability = require(a);
</script>

<p>
	<span
		>[<b>{a.type}</b>{#if ability.timing !== undefined}
			&nbsp;<i> {join(ability.timing, ', ')}</i>{/if}]</span
	>
	{#if ability.prerequisite}
		(<b>?</b><i>{ability.prerequisite}</i>) {#if a.description !== undefined} ⇒{/if}
	{/if}
	{a.description ?? ''}
	{#if ability.timesPerLoop === 1}
		(Once per ∞)
	{:else if ability.timesPerLoop == 2}
		(Twice per ∞)
	{:else if ability.timesPerLoop ?? 0 > 0}
		({ability.timesPerLoop} per ∞)
	{/if}
	{#if ability.timesPerDay === 1}
		(Once per Day)
	{:else if ability.timesPerDay === 2}
		(Twice per Day)
	{:else if ability.timesPerDay ?? 0 > 0}
		({ability.timesPerLoop} Per Day)
	{/if}
</p>

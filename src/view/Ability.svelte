<script lang="ts">
	import { join, require, showAll } from '../misc';
	import type { Abilitie } from '../model/roles';
	import OncePer from '../routes/gm/oncePer.svelte';

	export let a: Abilitie<Record<string, any>>;
	export let compact: boolean = false;
	$: ability = require(a);
</script>

<p>
	<span
		>[<b>{a.type}</b>{#if ability.timing !== undefined}
			&nbsp;<i> {join(ability.timing, ', ')}</i>{/if}]</span
	>
	{#if ability.prerequisite}
		[<i>{ability.prerequisite}</i>] {#if a.description !== undefined}⇒{/if}
	{/if}
	{a.description ?? ''}
	<OncePer {ability} {compact} />

</p>

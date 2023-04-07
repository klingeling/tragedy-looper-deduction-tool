<script lang="ts">
	import { scripts as scriptLookup, type Script } from '../../model/script';
	$: scripts = Object.values(scriptLookup).filter((x): x is Script => x !== undefined);
</script>

{#each scripts
	.map((key) => key.set)
	.sort( (a, b) => (a == undefined ? (b == undefined ? 0 : -1) : b == undefined ? 1 : a.localeCompare(b)) ) as set}
	<h1>{set ?? 'Independent'}</h1>
	{#each scripts
		.filter((x) => x?.set == set)
		.sort((a, b) => (a?.number ?? 0) - (b?.number ?? 0)) as s}
		{#if s}
			<a href={s.titel}>{s.number ?? ''} {s.titel} [{s.tragedySet}]</a>
		{/if}
	{/each}
{/each}

<style>
</style>

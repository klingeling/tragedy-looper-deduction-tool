<script lang="ts">
	import { distinct } from '../../misc';
	import { scripts as scriptLookup, type Script } from '../../model/script';
	$: scripts = Object.values(scriptLookup);
</script>

{#each distinct(scripts
		.map((key) => key.set?.name)
		.sort( (a, b) => (a == undefined ? (b == undefined ? 0 : -1) : b == undefined ? 1 : a.localeCompare(b)) )) as set}
	<h1>{set ?? 'Independent'}</h1>
	{#each scripts
		.filter((x) => x.set?.name == set)
		.sort((a, b) => (a.set?.number ?? 0) - (b.set?.number ?? 0)) as s}
		{#if s}
			<div>
				<a href={s.titel}>{s.set?.number ?? ''} {s.titel} [{s.tragedySet}]</a>
			</div>
		{/if}
	{/each}
{/each}

<style>
</style>

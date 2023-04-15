<script lang="ts">
	type Text = $$Generic<string | string[]>;
	type Obj = $$Generic<OncePer<Text, any>>;

	export let texts: Text;
	export let ability: Obj;

	$: element = [texts].flat().map((text) => ({
		text,
		days:
			ability[`timesPer${text}`] === undefined
				? 0
				: typeof ability[`timesPer${text}`] == 'number'
				? ability[`timesPer${text}`]
				: (ability[`timesPer${text}`][0] as number),
		constraints:
			ability[`timesPer${text}`] === undefined
				? []
				: Object.entries(
						typeof ability[`timesPer${text}`] == 'number'
							? {}
							: (ability[`timesPer${text}`][1] as Record<string, any>)
				  )
	}));

	function format(text: string, days: number | undefined) {
		if (text.toLowerCase() == 'loop') {
			text = '∞';
		}
		if (days === 1) {
			return `Once per ${text}`;
		} else if (days === 2) {
			return `Twice per ${text}`;
		} else if (days ?? 0 > 0) {
			return `${days} times per ${text}`;
		}
		return undefined;
	}
</script>

{#each element as { days, constraints, text }}
	{@const str = format(text, days)}
	{#if str}
		<em
			>{str}{#each constraints.filter(([key, value]) => value) as [key, value]}
				{' '} | {key}{#if value !== true}: {value}{/if}
			{/each}</em
		>
	{/if}
{/each}

<style>
	em {
		border: 1px solid var(--primary);
		border-radius: 1em;
		color: var(--primary);
		padding: 0px 1em;
		margin: 0px 0.1em;
		white-space: nowrap;
	}
</style>

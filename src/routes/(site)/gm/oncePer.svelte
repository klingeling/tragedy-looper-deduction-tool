<script lang="ts">
  import { getString } from '../../../translations';
  import { onMount } from 'svelte';

  type Obj = $$Generic<OncePer<Text, any>>;
  export let compact: boolean = false;

  let lang: string;
  onMount(() => {
    lang = navigator.language?.split('-')[0];
  });

  const texts = ['Day', 'Loop', 'Game'] as const;
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
          ),
  }));

  function format(text: string, days: number | undefined) {
    if (text.toLowerCase() == 'loop') {
      text = '∞';
    }
    if (days === 1) {
      return getString('Once per {type}', lang, { name: 'type', value: text }).replaceAll(' ', ' ');
    } else if (days === 2) {
      return getString('Twice per {type}', lang, { name: 'type', value: text }).replaceAll(
        ' ',
        ' '
      );
    } else if (days ?? 0 > 0) {
      return getString(
        '{days} per {type}',
        lang,
        { name: 'type', value: text },
        { name: 'days', value: days }
      ).replaceAll(' ', ' ');
    }
    return undefined;
  }
</script>

{#each element as { days, constraints, text }}
  {@const str = format(text, days)}
  {#if str}
    <em class:normal={!compact} class:compact
      >{str}{#each constraints.filter(([key, value]) => value) as [key, value]}
        {' '} | {getString(key, lang)}{#if value !== true}: {getString(value, lang)}{/if}
      {/each}</em
    >
  {/if}
{/each}

<style>
  em.normal {
    border: 1px solid var(--primary);
    border-radius: 1em;
    color: var(--primary);
    padding: 0px 1em;
    margin: 0px 0.1em;
    white-space: nowrap;
  }
  em.compact::before {
    content: '[';
  }
  em.compact::after {
    content: ']';
  }
</style>

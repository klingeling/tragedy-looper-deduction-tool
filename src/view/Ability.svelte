<script lang="ts">
  import { onMount } from 'svelte';
  import { join, require, showAll } from '../misc';
  import type { Abilitie } from '../model/roles';
  import OncePer from '../routes/(site)/gm/oncePer.svelte';
  import { getString } from '../translations';

  export let a: Abilitie<Record<string, any>>;
  export let compact: boolean = false;

  export let lang: string;
  onMount(() => {
    lang = navigator.language?.split('-')[0];
  });

  $: ability = require(a);
</script>

<p>
  <span
    >[<b>{getString(a.type, lang)}</b>{#if ability.timing !== undefined}
      &nbsp;<i>
        {join(
          ability.timing.map((x) => getString(x, lang)),
          ', '
        )}</i
      >{/if}]</span
  >
  {#if ability.prerequisite}
    [<i>{getString(ability.prerequisite, lang)}</i>] {#if a.description !== undefined}⇒{/if}
  {/if}
  {getString(a.description ?? '', lang)}
  <OncePer {ability} {compact} />
</p>

<script lang="ts">
  import { base } from '$app/paths';
  import '@picocss/pico/css/pico.css';
  import { getMissingForLanguage, getString } from '../../../translations';
  import { distinct } from '../../../misc';
  import { onMount } from 'svelte';
  import ExportView from '../../../view/exportView.svelte';

  let lang: string;
  onMount(() => {
    lang = navigator.language?.split('-')[0];
  });
  $: missingTranslation = getMissingForLanguage(lang);

  const table: Record<string, string> = {};

  let exportJson: string | undefined;

  function exportData() {
    console.log('exportng');
    exportJson = JSON.stringify(
      Object.fromEntries(
        Object.entries(table)
          .filter(([key, value]) => value?.length ?? 0 > 0)
          .map(([key, value]) => [key, value.trim()] as const)
      )
    );
  }
</script>

<ExportView bind:exportJson />

<main class="container">
  <h1>{getString('Missing Translations', lang)}</h1>

  <label>
    Language
    <input type="tel" bind:value={lang} />
  </label>

  <button on:click={() => exportData()}>Export</button>

  {#if lang}
    <table>
      <colgroup>
        <col style="width: min-content;" />
        <col style="width: 70%;" />
      </colgroup>
      <thead>
        <th>
          {getString('Key', lang)}
        </th>
        <th>
          {getString('Translation', lang)}
        </th>
      </thead>
      <tbody>
        {#each distinct(missingTranslation).sort() as e}
          <tr>
            <td>{e}</td>
            <td>
              <textarea bind:value={table[e]} />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>

<style>
</style>

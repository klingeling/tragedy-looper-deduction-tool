<script lang="ts">
  import { base } from '$app/paths';
  import '@picocss/pico/css/pico.css';
  import { onMount } from 'svelte';
  import { getMissingForLanguage, getString } from '../../translations';

  let lang: string;
  onMount(() => {
    lang = navigator.language?.split('-')[0];
  });
  $: missingTranslation = getMissingForLanguage(lang);
</script>

<main class="container">
  <h1>Tragedy Looper Deduction overview</h1>
  <p>
    If your are the Mastermind <a href="{base}/script">choose a script (SPOILER!!)</a>.
  </p>
  <p>Otherwise ask your Mastermind to choose a script and send you the link.</p>

  <p>
    Feedback is appriciated on <a
      href="https://github.com/LokiMidgard/tragedy-looper-deduction-tool#readme">Github</a
    >
    or
    <a
      href="https://boardgamegeek.com/thread/3066363/website-generate-script-specific-mastermind-and-pl"
      >Board Game Geek</a
    >.
  </p>

  {#if missingTranslation.length > 0}
    <p>
      {getString(
        'For your Language there are missing translations, if you have time and fun you can help and add some localisations using the below. And post them on Github.',
        lang
      )}<br>
      <a href={`${base}/translations`}>{getString('Translation Overview', lang)} </a>
    </p>
  {:else}
    <p>
      <a href={`${base}/translations`}>{getString('Translation Overview', lang)} </a>
    </p>
  {/if}
</main>

<style>
</style>

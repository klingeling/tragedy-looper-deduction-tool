<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import {
    getAllKeys,
    getAllTranslationsForLanguage,
    getMissingForLanguage,
    getString,
  } from '../../translations';

  let lang: string;
  onMount(() => {
    lang = navigator.language?.split('-')[0];
  });
</script>



<a href={`${base}/`}>{getString('Home', lang)}</a>

<slot />

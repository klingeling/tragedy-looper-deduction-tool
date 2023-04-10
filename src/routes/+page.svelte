<script lang="ts">
	import { onMount } from 'svelte';
	import type { ScriptIncidentPlayer, ScriptParameter } from '../model/script';
	import Table from '../view/table.svelte';
	import type { CharacterName } from '../model/characters';
	import type { TragedySetName } from '../model/tragedySets';
	import { parseSearchForPlayerAid } from '../serilezer';
	import { base } from '$app/paths';
	import '@picocss/pico/css/pico.css';
</script>

<h1>Tragedy Looper Deduction overview</h1>
<p>
	If your are the Mastermind <a href="{base}/script">choose a script (SPOILER!!)</a>.
</p>
<p>Otherwise ask your Mastermind to choose a script and send you the link.</p>

<style>
</style>

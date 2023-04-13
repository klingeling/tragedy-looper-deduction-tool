<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let difSet: Writable<readonly { numberOfLoops: number; difficulty: number }[]>;

	let selectedNumber = 1;

	let difficulty: number[] = [];
	let loops: number[] = [];

	$: update(selectedNumber);

	function update(size: number) {
		difficulty.splice(size);
		loops.splice(size);
		for (let i = 0; i < size; i++) {
			if (difficulty[i] == undefined) {
				difficulty[i] = 1;
			}

			if (loops[i] == undefined) {
				loops[i] = 1;
			}
		}
	}

	$: {
		difSet.set(difficulty.map((e, i) => ({ numberOfLoops: loops[i], difficulty: e })));
	}

	function remove(index: number) {
		difficulty.splice(index, 1);
		loops.splice(index, 1);
		selectedNumber--;
		// update ui, it dose not seem to recognize splice…
		difficulty = [...difficulty];
		loops = [...loops];
	}
</script>

<!-- <input type="number" bind:value={selectedNumber} min="1" /> -->

<table>
	<thead>
		<th>Loops</th>
		<th>Difficulty</th>
		<th />
	</thead>
	<tbody>
		{#each Array.from({ length: selectedNumber }) as _, i}
			<tr>
				<td>
					<input type="number" bind:value={loops[i]} min="1" />
				</td>
				<td>
					<input type="number" bind:value={difficulty[i]} min="1" max="8" />
				</td>
				<td>
					<button disabled={selectedNumber == 1} class="outline" on:click={() => remove(i)}
						>-</button
					>
				</td>
			</tr>
		{/each}
		<tr>
			<td colspan="3">
				<button class="outline" on:click={() => selectedNumber++}>+</button>
			</td>
		</tr>
	</tbody>
</table>

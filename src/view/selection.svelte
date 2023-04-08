<script lang="ts">
	const states = [' ', '？', '⭕', '❌'];
	let currentState = 0;

	function next() {
		currentState++;
		currentState %= states.length;
	}
</script>

<div class="click" on:click={() => next()}>
	<div>
		{states[currentState]}
	</div>
</div>

<style>
	@media print {
		.click {
			display: none;
		}
	}

	.click {
		display: grid;
		justify-items: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>

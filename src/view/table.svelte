<script lang="ts">
	import { cssesc, distinct, join, keys } from '../misc';
	import { characters } from '../model/characters';
	import { incidents } from '../model/incidents';
	import { plots } from '../model/plots';
	import { roles, type Abilities } from '../model/roles';
	import type { Script } from '../model/script';
	import { tragedySets } from '../model/tragedySets';

	export let script: Script;
	const NEW_LINE = ` " " `;

	console.log(cssesc('test wert', { isIdentifier: true }));

	$: tragedySet = script.tragedySet;
	$: chars = script.characters
		.map((x) => characters[x.cast])
		.sort((a, b) => a.name.localeCompare(b.name));

	$: tg = tragedySets[tragedySet];

	$: r = distinct([...tg.mainPlots, ...tg.subPlots].flatMap((x) => keys(plots[x].roles)))
		.sort()
		.map((x) => roles[x]);

	$: mainPlots = tragedySets[script.tragedySet].mainPlots.map((x) => plots[x]);
	$: subPlots = tragedySets[script.tragedySet].subPlots.map((x) => plots[x]);
	$: ince = script.incidents.map((x) => ({ ...incidents[x.incident], day: x.day }));

	function WriteLiens(cellCollback: (() => string[])[]) {
		let current = '';

		const rows = cellCollback.map((x) => x());
		// check length
		let columns: number | undefined = undefined;
		for (let i = 0; i < rows.length; i++) {
			if (i > 0) {
				current += '\n';
			}
			current += '"';
			const element = rows[i];
			if (columns === undefined) {
				columns = element.length;
			} else if (columns != element.length) {
				throw new Error(
					`row ${i + 1} has length ${element.length} expected ${columns} ${join(element, ' ')}`
				);
			}
			current += join(element, ' ') + '"';
		}
		// console.log(current.replaceAll('"', ''));
		return [
			current,
			join(
				Array.from({ length: (columns ?? 1) - 1 })
					.map(() => 'auto')
					.concat(['1fr']),
				' '
			),
			join(
				Array.from({ length: rows.length - 1 })
					.map(() => 'auto')
					.concat(['1fr']),
				' '
			)
		];
	}

	let gird_template_area: string | undefined;
	let gird_template_column: string | undefined;
	let gird_template_row: string | undefined;
	$: {
		[gird_template_area, gird_template_column, gird_template_row] = WriteLiens([
			() => {
				return Array.from({ length: r.length + ince.length + 5 }).map(() => 'top');
			},
			...mainPlots.map((mp) => () => {
				return [
					'main-plot-header',
					...r.map(
						(role) =>
							` main-role-plot-${cssesc(role.name, {
								isIdentifier: true
							})}-${cssesc(mp.name, { isIdentifier: true })} `
					),
					`main-plot-header-${cssesc(mp.name, { isIdentifier: true })}`,
					`main-plot-header-${cssesc(mp.name, { isIdentifier: true })}`,
					...ince.concat([undefined] as any).map(
						() =>
							`main-role-plot-rule-${cssesc(mp.name, {
								isIdentifier: true
							})}`
					),

					'.'
				];
			}),
			() => {
				return Array.from({ length: r.length + ince.length + 5 }).map(() => 'seccond');
			},
			...subPlots.map((mp) => () => {
				return [
					'sub-plot-header',
					...r.map(
						(role) =>
							` sub-role-plot-${cssesc(role.name, {
								isIdentifier: true
							})}-${cssesc(mp.name, { isIdentifier: true })} `
					),
					`sub-plot-header-${cssesc(mp.name, { isIdentifier: true })}`,
					`sub-plot-header-${cssesc(mp.name, { isIdentifier: true })}`,
					...ince.concat([undefined] as any).map(
						() =>
							`sub-role-plot-rule-${cssesc(mp.name, {
								isIdentifier: true
							})}`
					),

					'.'
				];
			}),
			() => {
				return [
					'role-header',
					...r.map((role) => `role-header-${cssesc(role.name, { isIdentifier: true })}`),
					'.',
					'incident-header',
					...ince.map((role) => `incident-header-${cssesc(role.name, { isIdentifier: true })}`),
					'rest',
					'rest'
				];
			},
			() => {
				return [
					'role-header',
					...r.map((role) => `role-header-${cssesc(role.name, { isIdentifier: true })}`),
					'.',
					'incident-header-day',
					...ince.map((role) => `incident-day-${cssesc(role.name, { isIdentifier: true })}`),
					'rest',
					'rest'
				];
			},
			...chars.map((char) => () => [
				`character-header`,
				...r.map(
					(role) =>
						` role-char-${cssesc(role.name, { isIdentifier: true })}-${cssesc(char.name, {
							isIdentifier: true
						})} `
				),
				` char-header-${cssesc(char.name, { isIdentifier: true })} `,
				` char-header-${cssesc(char.name, { isIdentifier: true })} `,
				...ince.map(
					(role) =>
						` incdent-char-${cssesc(role.name, {
							isIdentifier: true
						})}-${cssesc(char.name, { isIdentifier: true })} `
				),
				'rest',
				'rest'
			]),
			() => [
				'goodwillrefusal-header',
				...r.map((role) => `goodwillrefusal-${cssesc(role.name, { isIdentifier: true })}`),
				'.',
				'.',
				...ince.map((role) => `incident-rule-${cssesc(role.name, { isIdentifier: true })}`),
				'rest',
				'rest'
			],

			() => [
				'role-ability-header',
				...r.map((role) => `role-ability-${cssesc(role.name, { isIdentifier: true })}`),
				'.',
				'.',
				...ince.map((role) => `incident-rule-${cssesc(role.name, { isIdentifier: true })}`),
				'rest',
				'rest'
			]
		]);
	}



	function renderAbilitys(a: Abilities) {
		return `<p><span>[<b>${a.type}</b> <i>${join(a.timing, ', ')}</i>]</span> ${a.description}</p>`;
	}
</script>

<div class="root">
	<div
		class="table"
		style="grid-template-columns: {gird_template_column} ;grid-template-rows: {gird_template_row} ; grid-template-areas: {gird_template_area ??
			''};"
	>
		<div class="header vertical-header plot-main" style="grid-area: main-plot-header;">
			Main Plot
		</div>
		{#each mainPlots as p}
			<div class="plot-main" style="grid-area: main-plot-header-{cssesc(p.name)};">
				{p.name}
			</div>
			<div class="plot-main rules" style="grid-area: main-role-plot-rule-{cssesc(p.name)};">
				{@html join(
					p.rules.map((a) => renderAbilitys(a)),
					' '
				)}
			</div>

			{#each r as ri}
				<div
					class="plot-main role-counter"
					style="grid-area: main-role-plot-{cssesc(ri.name)}-{cssesc(p.name)};"
				>
					{p.roles[ri.name] ?? ''}
				</div>
			{/each}
		{/each}

		<div class="header vertical-header plot-sub" style="grid-area: sub-plot-header;">Sub Plot</div>
		{#each subPlots as p}
			<div class="plot-sub" style="grid-area: sub-plot-header-{cssesc(p.name)};">
				{p.name}
			</div>
			<div class="plot-sub rules" style="grid-area: sub-role-plot-rule-{cssesc(p.name)};">
				{@html join(
					p.rules.map((a) => renderAbilitys(a)),
					'<br>'
				)}
			</div>

			{#each r as ri}
				<div
					class="plot-sub role-counter"
					style="grid-area: sub-role-plot-{cssesc(ri.name)}-{cssesc(p.name)};"
				>
					{p.roles[ri.name] ?? ''}
				</div>
			{/each}
		{/each}

		<!-- <div class="header vertical-header role" style="grid-area: role-ability-header;">Abbiliy</div> -->
		<div class="header vertical-header role" style="grid-area: role-header;">Roles</div>
		{#each r as ri}
			<div class="vertical-header role" style="grid-area: role-header-{cssesc(ri.name)};">
				{ri.name}
				{#if ri.unkillable}
					<!-- <small>(Unkillable)</small> -->
					<small>(Immortal)</small>
				{/if}
			</div>
		{/each}
		<div class="header vertical-header incident" style="grid-area: incident-header-day;">Day</div>
		<div class="header vertical-header incident" style="grid-area: incident-header;">Incidents</div>
		{#each ince as i}
			<div class="vertical-header incident" style="grid-area: incident-header-{cssesc(i.name)};">
				{i.name}<br />
			</div>
			<div class="vertical-header incident" style="grid-area: incident-day-{cssesc(i.name)};">
				{i.day}
			</div>
		{/each}

		<div class="header vertical-header character" style="grid-area: character-header;">
			Characters
		</div>
		{#each chars as ci}
			<div class="character" style="grid-area: char-header-{cssesc(ci.name)}; ">
				{ci.name}
			</div>

			{#each r as ri}
				<div class="role-char" style="grid-area: role-char-{cssesc(ri.name)}-{cssesc(ci.name)};">
					{''}
				</div>
			{/each}
			{#each ince as ri}
				<div
					class="incident-char"
					style="grid-area: incdent-char-{cssesc(ri.name)}-{cssesc(ci.name)};"
				>
					{''}
				</div>
			{/each}
		{/each}

		<div class="header vertical-header role" style="grid-area: goodwillrefusal-header;">
			Goodwill<br />Refusel
		</div>
		{#each r as ri}
			<div class="vertical-header role" style="grid-area: goodwillrefusal-{cssesc(ri.name)};">
				{ri.goodwillRefusel ?? ''}
			</div>
		{/each}

		<div
			style="display: flex; flex-wrap: wrap; justify-items: flex-start; align-content: flex-start; justify-content: flex-start; align-items: flex-start; grid-area: rest; flex-direction: column; "
		>
			{#each ince as i}
				<article class="incident">
					<h1>
						{i.name}
					</h1>
					<h2>Day {i.day}</h2>

					<p>
						{i.effect}
					</p>
				</article>
			{/each}
			{#each r as ri}
				<article class="role">
					<h1>
						{ri.name}
					</h1>
					<h2>{ri.goodwillRefusel ? `Goodwill refusal: ${ri.goodwillRefusel}` : ''}</h2>
					{#if ri.unkillable}
						<h2>Immortal</h2>
					{/if}
					{@html join(
						ri.abilities.map((a) => renderAbilitys(a)),
						' '
					)}
				</article>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	:root {
		--background: white;
		--table-background: white;
		--color: black;

		--role-background-color-light: #612503;
		--character-background-color-light: #f7e6dd;
		--incident-background-color-light: #fff3eb;
		--plot-sub-background-color-light: #ade5ff;
		--plot-main-background-color-light: #18738f;

		--role-background-color: #612503;
		--character-background-color: #b0531e;
		--incident-background-color: #ffa978;
		--plot-sub-background-color: #ade5ff;
		--plot-main-background-color: #18738f;

		--role-color: #ffffff;
		--character-color: #ffffff;
		--incident-color: #000000;
		--plot-sub-color: #000000;
		--plot-main-color: #ffffff;

		--rule-width: 205rem;

		// --page-width: 277mm;
	}

	article {
		width: 5cm; //calc(var(--page-width) / 5 - 2px * 6);
		margin: 2px;
		padding: 4px;
		break-inside: avoid-page;

		h1 {
			// font-size: large;
			margin: 0px;
			font-size: 9pt;
		}
		h2 {
			// font-size: small;
			margin: 0px;
			font-size: 9pt;
		}

		:global(p:first-of-type) {
			margin-top: 1px;
		}

		:global(span)::after {
			content: '\A';
			white-space: pre;
		}
	}

	:global(p) {
		margin-top: 8px;
		margin-bottom: 0px;
	}
	:global(p:first-child) {
		margin-top: 0px;
		margin-bottom: 0px;
	}
	.root {
		// max-width: var(--page-width);
		height: calc(100% + 0px);
		width: calc(100% + 0px);
		// overflow: hidden;
		// overflow: auto;
	}
	.table {
		display: grid;
		height: calc(100% + 0px);
		width: calc(100% + 0px);
		//  overflow: auto;

		// justify-content: start;
		// justify-items: start;

		// align-content: start;
		// align-items: start;

		// gap: 2px;
		// background-color: var(--background);
		font-size: 8pt;
		& > * {
			margin: 1px;
		}
	}

	.table > * {
		background-color: var(--table-background);
		padding: 4px;
	}

	.rules {
		max-width: var(--rule-width);
		/* display: none; */
	}
	.vertical-header.rules {
		max-width: unset;
		max-height: var(--rule-width);
	}

	.role-char {
		background-color: var(--character-background-color-light);
	}
	.incident-char {
		background-color: var(--incident-background-color-light);
	}

	.role {
		background-color: var(--role-background-color);
		color: var(--role-color);
	}
	.role-counter {
	}
	.plot-sub {
		background-color: var(--plot-sub-background-color);
		color: var(--plot-sub-color);
	}
	.plot-main {
		background-color: var(--plot-main-background-color);
		color: var(--plot-main-color);
	}
	.character {
		background-color: var(--character-background-color);
		color: var(--character-color);
	}
	.incident {
		background-color: var(--incident-background-color);
		color: var(--incident-color);
	}
	.header {
		/* background-color: lightblue; */
		font-weight: bold;
		text-align: center;
	}
	.vertical-header {
		writing-mode: vertical-rl;
		transform: scale(-1, -1);
		/* width: min-content; */
	}
</style>

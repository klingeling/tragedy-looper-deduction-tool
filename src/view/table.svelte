<script lang="ts">
	import { onMount } from 'svelte';
	import { cssesc, distinct, join, keys } from '../misc';
	import {
		characters,
		type Character,
		type CharacterNames,
		charactersComesInLaterLoop
	} from '../model/characters';
	import { incidents } from '../model/incidents';
	import { plots } from '../model/plots';
	import { roles, type Abilities } from '../model/roles';
	import type { Script, ScriptIncident } from '../model/script';
	import { tragedySets, type TragedySet, type TragedySetNames } from '../model/tragedySets';

	// export let script: Script;

	export let tragedySet: TragedySetNames;
	export let charsName: readonly CharacterNames[];
	export let incidentsMapping: readonly Omit<ScriptIncident, 'culprit'>[];
	export let specialRules: readonly string[];

	onMount(() => {
		const incidentTemplate = document.getElementById('incidences') as HTMLTemplateElement;
		const roleTemplate = document.getElementById('role') as HTMLTemplateElement;
		const tragedyRulesTemplate = document.getElementById('tragedyRules') as HTMLTemplateElement;

		const newPageTemplate = document.getElementById('newPage') as HTMLTemplateElement;
		const root = document.getElementById('root') as HTMLElement;

		const containers: HTMLElement[] = [1, 2, 3]
			.map((x) => `rest-${x}`)
			.map((id) => document.getElementById(id) as HTMLDivElement);

		containers.forEach((c) => c.replaceChildren());

		Array.from(tragedyRulesTemplate.content.children)
			.concat(Array.from(incidentTemplate.content.children))
			.concat(Array.from(roleTemplate.content.children))
			.map((x) => x.cloneNode(true) as HTMLDivElement)
			.forEach((incident) => {
				for (const container of containers) {
					container.appendChild(incident);
					const rect = container.getBoundingClientRect();
					const container2IncedentRect = incident.getBoundingClientRect();
					if (isInsilde(container2IncedentRect, rect)) {
						return;
					}
					incident.remove();
				}
				// add page
				const newPage = newPageTemplate.content.firstChild?.cloneNode(true) as HTMLDivElement;
				root.appendChild(newPage);
				containers.push(newPage);
				newPage.appendChild(incident);
			});
	});

	function isInsilde(element: DOMRect, container: DOMRect): boolean {
		return (
			element.left >= container.left &&
			element.right <= container.right &&
			element.top >= container.top &&
			element.bottom <= container.bottom
		);
	}

	console.log(cssesc('test wert', { isIdentifier: true }));

	// $: tragedySet = script.tragedySet;
	$: chars = distinct(charsName.concat(charactersComesInLaterLoop))
		.map((x) => characters[x])
		.sort((a, b) => a.name.localeCompare(b.name));

	$: tg = tragedySets[tragedySet];

	$: r = distinct([...tg.mainPlots, ...tg.subPlots].flatMap((x) => keys(plots[x].roles)))
		.sort()
		.map((x) => roles[x]);

	$: mainPlots = tragedySets[tragedySet].mainPlots.map((x) => plots[x]);
	$: subPlots = tragedySets[tragedySet].subPlots.map((x) => plots[x]);
	$: ince = incidentsMapping.map((x) => ({ ...incidents[x.incident], day: x.day }));

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
				[
					'min-content',
					...r.map(() => 'auto'),
					'auto',
					'min-content',
					...ince.map(() => 'min-content'),
					'auto',
					'1fr'
				],
				// Array.from({ length: (columns ?? 1) - 1 })
				// 	.map(() => 'auto')
				// 	.concat(['1fr']),
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

					'rest-3'
				];
			}),
			() => {
				return Array.from({ length: r.length + ince.length + 4 })
					.map(() => 'seccond')
					.concat(['rest-3']);
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

					'rest-3'
				];
			}),
			() => {
				return [
					'role-header',
					...r.map((role) => `role-header-${cssesc(role.name, { isIdentifier: true })}`),
					'.',
					'incident-header',
					...ince.map((role) => `incident-header-${cssesc(role.name, { isIdentifier: true })}`),
					'rest-2',
					'rest-3'
				];
			},
			() => {
				return [
					'role-header',
					...r.map((role) => `role-header-${cssesc(role.name, { isIdentifier: true })}`),
					'.',
					'incident-header-day',
					...ince.map((role) => `incident-day-${cssesc(role.name, { isIdentifier: true })}`),
					'rest-2',
					'rest-3'
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
				'rest-2',
				'rest-3'
			]),
			() => [
				'goodwillrefusal-header',
				...r.map((role) => `goodwillrefusal-${cssesc(role.name, { isIdentifier: true })}`),
				'.',
				'.',
				...ince.map((role) => `incident-rule-${cssesc(role.name, { isIdentifier: true })}`),
				'rest-2',
				'rest-3'
			],

			() => [
				'rest-1',
				...r.map((role) => `rest-1`),
				'rest-1',
				'rest-1',
				...ince.map((role) => `rest-1`),
				'rest-2',
				'rest-3'
			]
		]);
	}

	function renderAbilitys(a: Abilities) {
		return `<p><span>[<b>${a.type}</b> <i>${join(a.timing, ', ')}</i>]</span> ${a.description}</p>`;
	}
</script>

<div class="root" id="root">
	<div
		class="table page"
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
				{@const amount = p.roles[ri.name]}
				<div
					class="plot-main role-counter"
					style="grid-area: main-role-plot-{cssesc(ri.name)}-{cssesc(p.name)};"
				>
					{#if Array.isArray(amount)}
						{amount[0]} - {amount[1]}
					{:else if typeof amount == 'number'}
						{amount}
					{/if}
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
				{@const amount = p.roles[ri.name]}
				<div
					class="plot-sub role-counter"
					style="grid-area: sub-role-plot-{cssesc(ri.name)}-{cssesc(p.name)};"
				>
					{#if Array.isArray(amount)}
						{amount[0]} - {amount[1]}
					{:else if typeof amount == 'number'}
						{amount}
					{/if}
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
				{#if charactersComesInLaterLoop.includes(ci.name)} <i>(?)</i>{/if}
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
			class="overflow"
			id="rest-1"
			style="grid-area: rest-1; margin-top: 1px; margin-left: 1px;"
		/>
		<div class="overflow" id="rest-2" style="grid-area: rest-2; margin-top:1px; margin-left:1px;" />
		<div
			class="overflow"
			id="rest-3"
			style="grid-area: rest-3; margin-left: 1px; margin-top: 1px;"
		/>
	</div>
</div>

<template id="newPage">
	<div class="page overflow" />
</template>
<template id="incidences">
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
</template>
<template id="role">
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
</template>
<template id="tragedyRules">
	<article class="tragedyRules">
		<h1>Special Rule</h1>
		{#each specialRules as sp}
			<p>
				{sp}
			</p>
		{/each}
	</article>

	{#each tg.extraRules as ri}
		<article class="tragedyRules">
			<h1>
				{ri.name}
			</h1>
			<p>
				{ri.description}
			</p>
		</article>
	{/each}
</template>

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

		--page-width: 297mm;
		--page-height: 210mm;
	}

	@media screen {
		:global(.page) {
			overflow: hidden;
			margin: auto;
			margin-top: 1rem;
			margin-bottom: 1rem;
			// border: 1px solid lightgray;
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6), inset 0 0 3px rgba(0, 0, 0, 0.6);
		}
		:global(body) {
			background-color: var(--background);
			margin: 0 auto 0 auto;
		}
	}
	@media print {
		@page {
			size: A4 landscape;
		}

		:global(.page) {
			overflow: hidden;
		}

		:global(.page) {
			height: calc(var(--page-height) - 0px);
			width: calc(var(--page-width) - 0px);
			// margin: 2.5cm;
			background-color: lightgoldenrodyellow;
			page-break-after: always;
		}
	}

	:global(.overflow) {
		display: flex;
		flex-wrap: wrap;
		justify-items: flex-start;
		align-content: flex-start;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		gap: 1px;
		overflow: hidden;
	}

	article {
		width: 5cm; //calc(var(--page-width) / 5 - 2px * 6);
		// margin: 2px;
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
	:global(.page) {
		height: calc(var(--page-height) - 5px);
		width: calc(var(--page-width) - 5px);
		padding: 4px;
		// margin: 2.5cm;
		background-color: white;
		page-break-after: always;
	}
	.root {
		// max-width: var(--page-width);
		// overflow: hidden;
		// overflow: auto;
	}
	.table {
		display: grid;
		// height: calc(100% + 0px);
		// width: calc(100% + 0px);
		//  overflow: auto;

		// justify-content: start;
		// justify-items: start;

		// align-content: start;
		// align-items: start;

		// gap: 2px;
		// background-color: var(--background);
		font-size: 8pt;

		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		// font-family: Verdana, Geneva, Tahoma, sans-serif;
		& > *:not(.overflow) {
			margin: 1px;
		}
	}

	.table > *:not(.overflow) {
		// background-color: var(--table-background);
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

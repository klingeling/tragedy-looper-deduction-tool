<script lang="ts">
	import { onMount } from 'svelte';
	import { scripts } from '../model/script';
	import Table from '../view/table.svelte';
	import { Previewer, Handler, type OnOverflow, type Overflow, type BreakToken } from 'pagedjs';
	import type { Polisher } from 'pagedjs';
	import type { Page } from 'pagedjs';
	import type { Chunker } from 'pagedjs';
	import { page } from '$app/stores';
	// import {} from 'pagedjs';

	class OverflowHandler extends Handler implements OnOverflow {
		private chunker: Chunker;
		private currentPage: Page | undefined;
		private forcedBreak = false;
		constructor(chunker: Chunker, polisher: Polisher, caller: any) {
			super(chunker, polisher, caller);
			this.chunker = chunker;
		}
		onOverflow(overflow: Overflow | undefined, rendered: Element, bounds: DOMRect) {
			if (overflow) {
				// console.log(overflow.startContainer.outerHTML);
			}
		}

		beforePageLayout(page: Page) {
			// console.log(page);
			this.currentPage = page;
		}

		onBreakToken(breakToken: any, overflow: any, rendered: any) {
			// console.log({ breakToken, overflow, rendered });
		}

		renderNode(node: Element, sourceNode: Element) {
			const bounds = this.currentPage?.layoutMethod.bounds;
			this.forcedBreak = false;

			if (sourceNode.tagName == 'ARTICLE' && bounds) {
				const rect = node.getClientRects();
				console.log(rect);
				console.log(bounds);
				if (bounds.right < rect[0].right) {
					console.warn('overflow');
					this.forcedBreak = true;
					this.currentPage?.layoutMethod.forceBreak();
				}
			}
		}

		afterPageLayout(pageElement: Element, page: Page, breakToken: BreakToken) {
			console.log({ page, pageElement, breakToken });
			const x = page.checkOverflowAfterResize(pageElement);
			page.layoutMethod.forceBreak();
			console.log(x);
			if (breakToken) {
				if (breakToken.node.parentElement) {
					let current: Element | null = breakToken.node;
					while (current && current.tagName != 'article'.toUpperCase()) {
						current = current.parentElement;
					}
					// page.checkOverflowAfterResize()
					if (current != null && this.forcedBreak && current.previousSibling) {
						const newNode = current;
						const toRemove = Array.from(
							pageElement.getElementsByTagName('article'.toUpperCase())
						).filter((x) => x.getAttribute('data-ref') == newNode.getAttribute('data-ref'))[0];
						console.log('current', current.outerHTML);
						current = current.previousSibling as any;
						console.log('current2', current?.outerHTML);
						if (toRemove) {
							toRemove.remove();
						}
					}
					if (current != null) {
						const newNode = current;
						const toRemove = Array.from(
							pageElement.getElementsByTagName('article'.toUpperCase())
						).filter((x) => x.getAttribute('data-ref') == newNode.getAttribute('data-ref'))[0];
						if (toRemove) {
							toRemove.remove();
							breakToken.node = current;
						}
					}
				}
			}
		}

		// onOverflow(overflow: any, rendered: Element, bounds: any) {
		// 	// console.log({overflow, rendered, bounds});
		// 	if (overflow == undefined) return;
		// 	console.log('overflow', overflow);
		// 	console.log('bounds', bounds);
		// 	console.log(rendered.outerHTML);
		// }
	}

	onMount(async () => {
		const previewer = new Previewer();

		let html = document.querySelector<HTMLTemplateElement>('#html');
		const renderTo = document.querySelector('#renderTo');

		const p = new Previewer();

		p.registerHandlers(OverflowHandler);
		if (html?.content && renderTo) {
			p.preview(html?.content, undefined, renderTo);
		}

		// const polisher = new Paged.Polisher();
		// const chunker = new Paged.Chunker();

		// chunker.flow(html?.content, renderTo);
	});
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<template id="html">
	<Table script={scripts[0]} />
</template>
<!-- <Table script={scripts[0]} /> -->

<div id="renderTo" />

<style>
	/* @media screen { */
		@page {
			size: 297mm 210mm;
			margin-top: 5mm;
			margin-right: 5mm;
			margin-bottom: 5mm;
			margin-left: 5mm;
		}

		:global(body) {
			background-color: var(--background);
			margin: 0 auto 0 auto;
		}
		:global(.pagedjs_pages) {
			display: flex;
			/* // max-width: var(--pagedjs-width); */
			flex: 0;
			flex-wrap: wrap;
			margin: 0 auto;
			margin-top: var(--screen-pages-spacing);
		}
		:global(.pagedjs_page) {
			background: var(--color-paper);
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6), inset 0 0 3px rgba(0, 0, 0, 0.6);
			flex-shrink: 0;
			flex-grow: 0;
			margin: auto auto var(--screen-pages-spacing) auto;
		}
	/* } */
	:root {
		--screen-pages-spacing: 10rem;
		--color-paper: white;
		--background: lightgray;

		/* --background: lightgray; */
		/* --muted-color: #dfdfdf; */
		/* --background-color: white; */
	}
</style>

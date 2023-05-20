<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import { products } from '$lib/common/constants';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1 class="text-3xl">SvelteKit 1.0 Store</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3 text-center">
			<button class="btn variant-filled-primary rounded">Checkout with Stripe API</button>
		</div>
	</div>
</div>

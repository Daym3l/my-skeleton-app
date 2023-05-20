<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import { products } from '$lib/common/constants';
	import { getCardItems } from '../state/cart';

	const onCheckout = async () => {
		await fetch('api/stripeCheckout', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				items: getCardItems()
			})
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	};
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
			<button class="btn variant-filled-primary rounded" on:click={() => onCheckout()}
				>Checkout with Stripe API</button
			>
		</div>
	</div>
</div>

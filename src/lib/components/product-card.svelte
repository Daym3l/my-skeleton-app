<script lang="ts">
	import { getCardItems, addCardItem, removeCardItem, cartItems } from '../../state/cart';
	export let product: Product = { id: '', name: '', price: 0 };
	const { name, id, price } = product;

	let cart = getCardItems();
	let cartProduct = cart.find((cartItem) => id === cartItem.id);
	let isDisabled = !cartProduct?.quantity || cartProduct?.quantity === 0;
	cartItems.subscribe((newValue) => {
		cart = newValue;
		cartProduct = cart.find((cartItem) => id === cartItem.id);
		isDisabled = !cartProduct?.quantity || cartProduct?.quantity === 0;
	});
</script>

<div class="card rounded">
	<header class="card-header">
		<h2 class="text-base">{name}</h2>
	</header>
	<section>
		<div class=" px-4">Quantity: <strong>{cartProduct?.quantity ?? 0}</strong></div>
		<div class=" px-4">Price: ${price}</div>
	</section>
	<footer class="card-footer mt-2">
		<button class="btn p-2 rounded variant-ghost-primary" on:click={() => addCardItem(id)}
			>Add</button
		>
		<button
			disabled={isDisabled}
			class="btn p-2 rounded variant-ghost-error"
			on:click={() => removeCardItem(id)}>Remove</button
		>
	</footer>
</div>

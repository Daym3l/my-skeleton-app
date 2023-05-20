import { writable, get } from 'svelte/store';

export const cartItems = writable<CartItems[]>([]);

export const addCardItem = (id: string) => {
	const items = get(cartItems);
	const indexItem = items.findIndex((item) => item.id === id);
	if (indexItem !== -1) {
		cartItems.update(() => {
			const updatedItems = items.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			return updatedItems;
		});
	} else {
		cartItems.update(() => {
			return [...items, { id, quantity: 1 }];
		});
	}
};

export const removeCardItem = (id: string) => {
	const items = get(cartItems);
	const indexItem = items.findIndex((item) => item.id === id);

	if (items[indexItem]?.quantity - 1 === 0) {
		items.splice(indexItem, 1);
	}

	cartItems.update(() => {
		const updatedItems = items.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		return updatedItems;
	});
};

export const getCardItems = () => get(cartItems);

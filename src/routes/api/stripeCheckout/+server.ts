import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';

const SECRET_STRIPE_KEY =
	'sk_test_51N9qgxG5p5a56aITqCV3MTorHj86EiBP0BnUm9brOiI6QUIQ4FDFLMj7YBFHDYdJKCW5MlQtlZWiqTJ37VPQSEi9002MRQG61U';
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15'
});

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items;

	const lineItems: any = [];
	items.forEach((item: any) => {
		lineItems.push({ price: item.id, quantity: item.quantity });
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel;'
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'Content-Type': 'aplication/json' }
	});
};

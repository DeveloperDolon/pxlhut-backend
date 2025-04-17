import { TProduct } from './paytment.interface';
import config from '../../config';

const stripe = require('stripe')(config.strip_secret_key);

const stripPayment = async (products: TProduct[]) => {
  const lineItems = products.map((product: TProduct) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'https://www.pxlhut.com',
    cancel_url: 'https://www.pxlhut.com',
  });

  return session;
};

export const PaymantService = { stripPayment };

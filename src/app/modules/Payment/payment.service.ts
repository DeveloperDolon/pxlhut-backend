import { TProduct } from './paytment.interface';
import config from '../../config';
import { Payment } from './payment.model';

const stripe = require('stripe')(config.strip_secret_key);

const stripPayment = async (products: TProduct[], user_id: string) => {
  const lineItems = products.map((product: TProduct) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
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

  const payment = await Payment.create({
    user_id,
    price: session?.amount_total,
    transaction_id: session?.id,
  });

  return payment;
};

export const PaymantService = { stripPayment };

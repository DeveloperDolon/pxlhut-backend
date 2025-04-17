import { z } from 'zod';

const checkoutValidation = z.object({
  body: z.object({
    products: z.array(
      z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    ),
  }),
});

export const PaymentValidation = { checkoutValidation };

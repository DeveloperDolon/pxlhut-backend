import { model, Schema } from 'mongoose';
import { TPayment } from './paytment.interface';
import { v4 as uuidv4 } from 'uuid';

const paymentSchema = new Schema<TPayment>(
  {
    id: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    user_id: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    transaction_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<TPayment>('Payment', paymentSchema);

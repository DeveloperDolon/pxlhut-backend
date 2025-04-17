export type TProduct = {
  name: string;
  price: number;
  quantity: number;
};

export type TPayment= {
  id: string;
  user_id: string;
  price: number;
  transaction_id: string;
}

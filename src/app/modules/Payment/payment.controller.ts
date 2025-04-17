import httpStatus from 'http-status';
import catchAsync from '../../utiils/catchAsync';
import sendRespnse from '../../utiils/sendResponse';
import { PaymantService } from './payment.service';

const createPayment = catchAsync(async (req, res) => {
  const { products } = req.body;

  const result = await PaymantService.stripPayment(products);

  return sendRespnse(res, {
    statusCode: httpStatus.OK,
    message: 'Payment successful!',
    success: true,
    data: result,
  });
});

export const PaymentController = { createPayment };

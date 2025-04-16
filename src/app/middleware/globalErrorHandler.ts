import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err.statusCode);

    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSource : TError = 
}
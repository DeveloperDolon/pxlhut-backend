import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err.statusCode);

    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources : TErrorSources = [
        {
            path: '',
            message: 'Something went wrong!'
        }
    ];

    if(err instanceof ZodError){
        const simplifiedErrors ='' ;
    }
}
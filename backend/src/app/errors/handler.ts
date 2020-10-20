import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { HttpError } from './HttpError';

interface ValidationErrors {
    [key: string]: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof HttpError)
        return response
            .status(400)
            .json({ code: error.code, message: error.message });

    if (error instanceof ValidationError) {
        const errors: ValidationErrors = {};

        error.inner.forEach((err) => {
            errors[err.path] = err.errors;
        });

        return response.status(400).json({ code: 'Validation fails', errors });
    }

    return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;

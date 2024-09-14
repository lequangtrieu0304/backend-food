import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const message = exceptionResponse.message || 'Validation failed';

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: status,
      error: 'Bad Request',
      message: Array.isArray(message) ? message.join(', ') : message,
    });
  }
}

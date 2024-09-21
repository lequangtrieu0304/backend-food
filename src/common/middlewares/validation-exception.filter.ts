import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { defaultPayload } from '@common/api.schema';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const message = exceptionResponse.message || 'Validation failed';

    response.status(HttpStatus.BAD_REQUEST).json({
      ...defaultPayload,
      statusCode: status,
      success: false,
      message: Array.isArray(message) ? message.join(', ') : message,
    });
  }
}

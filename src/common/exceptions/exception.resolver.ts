import { defaultPayload, Payload } from '@common/api.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

export const SUCCESS = '000000';
export const UNKNOWN = '999999';

export class BaseHttpException<TData = any> extends HttpException {
  constructor(partial: Payload<TData>, statusCode: number) {
    const payload = {
      ...defaultPayload,
      ...partial,
      statusCode: statusCode,
      statusText: HttpStatus[statusCode],
    };
    payload.success = payload.errorCode === SUCCESS && payload.message === '';
    super(payload, statusCode);
  }
}

export class BadRequest<TData> extends BaseHttpException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.BAD_REQUEST);
  }
}

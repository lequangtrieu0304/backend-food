import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as _ from 'lodash';
import { Request } from 'express';

export interface IAddParamsToBodyArgs {
  paramSource?: string;
  paramDest?: string;
  injectDataTo?: string;
}

function modifyRequest(req: Request, args: IAddParamsToBodyArgs) {
  const user = {
    ...req.user,
    _id: req.user._id.toString(),
  };
  const { paramSource, paramDest, injectDataTo = 'body' } = args;

  const setValue = !paramSource ? user : _.get(user, paramSource, null);
  const setKey = paramDest ? paramDest : paramSource ? paramSource : 'user';

  _.set(req[injectDataTo], setKey, setValue);
  return req[injectDataTo];
}

export const AddUserToBody = createParamDecorator(
  (args: IAddParamsToBodyArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return modifyRequest(req, args);
  },
);

export const AddUserIdToBody = createParamDecorator(
  (args: IAddParamsToBodyArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    args = Object.assign({}, args, {
      paramSource: '_id',
      paramDest: 'userId',
    });
    return modifyRequest(req, args);
  },
);

export const AddCreatedByIdToBody = createParamDecorator(
  (args: IAddParamsToBodyArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    args = Object.assign({}, args, {
      paramSource: '_id',
      paramDest: 'createdBy',
    });
    return modifyRequest(req, args);
  },
);

import { join } from 'path';
import * as fs from 'fs';

import {
  ApiOperation as SwgOperation,
  ApiTags as SwgApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiHeaderOptions } from '@nestjs/swagger/dist/decorators/api-header.decorator';

import { PaginatedMeta, PaginatedResult } from '@/common/api.schema';

export * from '@nestjs/swagger';

const createApiOperation = (defaultOptions: ApiOperationOptions) => {
  return (options?: ApiOperationOptions): MethodDecorator =>
    SwgOperation({
      ...defaultOptions,
      ...options,
    });
};

export const ApiOperation = createApiOperation({
  summary: 'Summary description',
});
export const ApiListOperation = createApiOperation({
  summary: 'Liệt kê danh sách tất cả bản ghi',
});
export const ApiRetrieveOperation = createApiOperation({
  summary: 'Lấy thông tin chi tiết 1 bản ghi',
});
export const ApiCreateOperation = createApiOperation({
  summary: 'Tạo mới 1 bản ghi',
});
export const ApiUpdateOperation = createApiOperation({
  summary: 'Sửa 1 bản ghi',
});
export const ApiPartialOperation = createApiOperation({
  summary: 'Sửa 1 bản ghi',
});
export const ApiDeleteOperation = createApiOperation({
  summary: 'Xoá 1 bản ghi',
});
export const ApiBulkDeleteOperation = createApiOperation({
  summary: 'Xoá hàng loạt',
});
export const ApiBulkUpdateOperation = createApiOperation({
  summary: 'Sửa hàng loạt',
});
export const ApiUpdateManyOperation = createApiOperation({
  summary: 'Sửa nhiều bản ghi có dữ liệu cập nhật khác nhau',
});

export function ApiLanguageHeader(
  header?: ApiHeaderOptions,
): MethodDecorator & ClassDecorator {
  const i18nFolder = join(__dirname, '..', '..', 'i18n');
  const folders = fs
    .readdirSync(i18nFolder)
    .filter((file) => fs.statSync(join(i18nFolder, file)).isDirectory());
  return applyDecorators(
    ApiHeader({
      description: 'language {string}: Ngôn ngữ',
      name: 'x-language',
      required: false,
      enum: folders,
      ...header,
    }),
  );
}

export function ApiTagsAndBearer(...tags: string[]) {
  return applyDecorators(ApiBearerAuth(), SwgApiTags(...tags));
}

export const ApiPaginatedResponse = <TModel extends Type>(model?: TModel) => {
  return applyDecorators(
    ApiExtraModels(...(model ? [PaginatedResult, model] : [PaginatedResult])),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf ${model?.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedResult) },
          {
            properties: {
              data: {
                type: 'array',
                items: model ? { $ref: getSchemaPath(model) } : undefined,
              },
              meta: {
                items: { $ref: getSchemaPath(PaginatedMeta) },
              },
            },
          },
        ],
      },
    }),
  );
};

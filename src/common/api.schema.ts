import { ApiProperty } from '@nestjs/swagger';

export const defaultPayload = {
  success: true,
  statusCode: 200,
  statusText: 'SUCCESS',
  errorCode: '000000',
  message: '',
  data: null,
  meta: null,
};

export abstract class Payload<TData> {
  success?: boolean;
  statusCode?: number;
  statusText?: string;
  errorCode?: string;
  message?: string;
  data?: TData | null;
  meta?: PaginatedMeta | null;

  constructor(partial: Payload<TData>) {
    Object.assign(this, partial);
  }
}

export class PaginatedMeta {
  @ApiProperty()
  totalItems?: number;

  @ApiProperty()
  totalPages?: number;

  @ApiProperty()
  currentPage?: number;

  [s: string]: any;

  constructor(query: Record<string, any>, partial: PaginatedMeta) {
    Object.assign(this, {
      ...partial,
      pageSize: query.pageSize,
      currentPage: query.pageNumber,
      totalPages: Math.ceil(
        Number(partial.totalItems) / Number(query.pageSize),
      ),
    });
  }
}

export class PaginatedResult<TData> {
  @ApiProperty()
  meta: PaginatedMeta;

  @ApiProperty()
  data: TData[];

  constructor(
    data: TData[],
    query: Record<string, any>,
    partial: PaginatedMeta,
  ) {
    this.data = data;
    this.meta = new PaginatedMeta(query, partial);
  }
}

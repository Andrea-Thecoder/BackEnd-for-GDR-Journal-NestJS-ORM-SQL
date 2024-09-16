import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function GroupApiResponses<T>(successType:Type<T>) {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Success' , type: successType}),
    ApiResponse({status: 400, description:"Bad Request"}),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Not Found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
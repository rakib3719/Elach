/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomConflictDto } from '../dto/custom-conflict.dto';
import { CustomForbiddenDto } from '../dto/custom-forbidden.dto';
import { CustomInternalServerErrorDto } from '../dto/custom-internal-server-error.dto';
import { CustomNotFoundDto } from '../dto/custom-not-found.dto';
import { CustomTooManyRequestsDto } from '../dto/custom-throttler.dto';
import { CustomUnauthorizedDto } from '../dto/custom-unauthorized.dto';
import { ValidationErrorResponseDto } from '../dto/validation-error.dto';

interface ErrorDtoMap {
  validation?: any | boolean;
  unauthorized?: any | boolean;
  forbidden?: any | boolean;
  notFound?: any | boolean;
  conflict?: any | boolean;
  internal?: any | boolean;
  throttle?: any | boolean;
}

export function ApiErrorResponse(dtos: ErrorDtoMap) {
  const decorators: (MethodDecorator & ClassDecorator)[] = [];
  if (dtos.validation)
    decorators.push(
      ApiBadRequestResponse({
        type:
          dtos.validation === true
            ? ValidationErrorResponseDto
            : dtos.validation,
      }),
    );
  if (dtos.unauthorized)
    decorators.push(
      ApiUnauthorizedResponse({
        type:
          dtos.unauthorized === true
            ? CustomUnauthorizedDto
            : dtos.unauthorized,
      }),
    );
  if (dtos.forbidden)
    decorators.push(
      ApiForbiddenResponse({
        type: dtos.forbidden === true ? CustomForbiddenDto : dtos.forbidden,
      }),
    );
  if (dtos.notFound)
    decorators.push(
      ApiNotFoundResponse({
        type: dtos.notFound === true ? CustomNotFoundDto : dtos.notFound,
      }),
    );
  if (dtos.conflict)
    decorators.push(
      ApiConflictResponse({
        type: dtos.conflict === true ? CustomConflictDto : dtos.conflict,
      }),
    );
  if (dtos.internal)
    decorators.push(
      ApiInternalServerErrorResponse({
        type:
          dtos.internal === true ? CustomInternalServerErrorDto : dtos.internal,
      }),
    );
  if (dtos.throttle)
    decorators.push(
      ApiTooManyRequestsResponse({
        type:
          dtos.throttle === true ? CustomTooManyRequestsDto : dtos.throttle,
      }),
    );

  return applyDecorators(...decorators);
}

import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ObjGenModes } from '../enums/obj-gen-modes.enum';
import { configPossibleStatusObject } from '../helpers/config-possible-status-object';

/**
 * Add undefined number of @ApiResponse() swagger decorators using configPossibleStatusObject function
 */
export const OperationsDefaultResponses = (
  config: string,
  mode?: ObjGenModes,
  ...statusCodes: number[]
) => {
  const statusResponsesObject = configPossibleStatusObject(
    config,
    mode,
    ...statusCodes,
  );

  const apiResponses = [];

  Object.keys(statusResponsesObject).forEach((key) => {
    apiResponses.push(
      ApiResponse({
        status: Number(key),
        description: statusResponsesObject[key],
      }),
    );
  });

  return applyDecorators(...apiResponses);
  
};

import { MethodDocConfigObject } from '../types/method-doc-config-object';
import { BadRequestException, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { DetailedDefaultResponses } from '../../responses-generator/decorators/detailed-default-responses';

export const MethodDocConfig = (configObject: MethodDocConfigObject) => {
  // apiRsponse property cannot be setted if either basic or detailed deafaults are defined.

  // verifies
  if (
    configObject.responses &&
    (configObject.responses.basicDefaults ||
      configObject.responses.detailedDefaults)
  ) {
    if (configObject.responses.apiResponse) {
      throw new BadRequestException('ERROR_MESSAGE_TO_CONFIG');
    }
  }
  if (configObject.responses && configObject.responses.apiResponse) {
    if (
      configObject.responses.basicDefaults ||
      configObject.responses.detailedDefaults
    ) {
      throw new BadRequestException('ERROR_MESSAGE_TO_CONFIG');
    }
  }

  // create decorators arr
  const decoratorsArr = [];

  if (configObject.apiOperation) {
    const apiOperationDec = ApiOperation(configObject.apiOperation);
    decoratorsArr.push(apiOperationDec);
  }
  if (configObject.apiBody) {
    const apiBodyDec = ApiBody(configObject.apiBody);
    decoratorsArr.push(apiBodyDec);
  }
  if (configObject.apiParam) {
    const apiParamDec = ApiParam(configObject.apiParam);
    decoratorsArr.push(apiParamDec);
  }
  if (configObject.apiQuery) {
    const apiQueryDec = ApiQuery(configObject.apiQuery);
    decoratorsArr.push(apiQueryDec);
  }

  if (configObject.responses) {
    const responsesDecorators = [];
    const basicDefault = configObject.responses.basicDefaults ?? undefined;
    const detailedDefaults =
      configObject.responses.detailedDefaults ?? undefined;
    const apiResponses = configObject.responses.apiResponse ?? undefined;

    if (basicDefault || detailedDefaults) {
      let basicAndDetailedDefaultResponses;
      if (basicDefault && detailedDefaults) {
        basicAndDetailedDefaultResponses = DetailedDefaultResponses(
          basicDefault,
          ...detailedDefaults,
        );
      } else if (basicDefault) {
        basicAndDetailedDefaultResponses =
          DetailedDefaultResponses(basicDefault);
      } else {
        basicAndDetailedDefaultResponses = DetailedDefaultResponses(
          ...detailedDefaults,
        );
      }
      responsesDecorators.push(basicAndDetailedDefaultResponses);
    } else {
      if (apiResponses) {
        apiResponses.forEach((responseConfig) => {
          responsesDecorators.push(ApiResponse(responseConfig));
        });
      }
    }
    decoratorsArr.push(...responsesDecorators);
  }

  return applyDecorators(...decoratorsArr);
};

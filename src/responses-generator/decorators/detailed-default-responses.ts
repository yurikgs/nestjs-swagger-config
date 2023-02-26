import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { BasicDefaultsObject } from '../types/basic-defaults-object';
import { DetailedDefaultsObject } from '../types/detailed-defaults-object';
import { applyDecorators, BadRequestException, Logger } from '@nestjs/common';
import { OperationsDefaultResponses } from './operations-default-responses';
import { configDetailedStatusObject } from '../helpers/config-detailed-status-object';
import { OperationResponsesDict } from '../dicts/operation-responses.dict';
import { craftResponseSchemaObject } from '../helpers/craft-response-schema-object';
import { preconfigDetailedDefaults } from '../helpers/preconfig-detailed-defaults';

export const DetailedDefaultResponses = (
  basicOrDetailedDefaults?: BasicDefaultsObject | DetailedDefaultsObject,
  ...detailedDefaults: DetailedDefaultsObject[]
) => {

  //basicDefaultsObject and detailedDefaultsArr Config:
  let basicDefaults;
  if (Object.prototype.hasOwnProperty.call(basicOrDetailedDefaults, 'config')) {
    basicDefaults = basicOrDetailedDefaults;
  } else {
    detailedDefaults.push(basicOrDetailedDefaults as DetailedDefaultsObject);
  }

  if (!basicDefaults && !detailedDefaults) {
    Logger.error('Please send any defaults to config');
    throw new BadRequestException('Please send any defaults to config');
  }

  if (basicDefaults && !detailedDefaults.length) {
    const statusCodes = basicDefaults.statusCodes ?? [];
    return applyDecorators(
      OperationsDefaultResponses(
        basicDefaults.config,
        basicDefaults.mode,
        ...statusCodes,
      ),
    );
  }

  // Object Config
  detailedDefaults = preconfigDetailedDefaults(detailedDefaults);
  const detailedDefaultsObject = configDetailedStatusObject(
    basicDefaults,
    ...detailedDefaults,
  );

  // applyDecoratorsArrConfig
  const decoratorsArr = [];
  const modelsToConfig = [];
  Object.keys(detailedDefaultsObject).forEach((status) => {
    // Preconfig:
    let schema = void 0;
    if (detailedDefaultsObject[status].model) {
      modelsToConfig.push(detailedDefaultsObject[status].model);

      schema = craftResponseSchemaObject(detailedDefaultsObject[status]);
    }

    const description =
      detailedDefaultsObject[status].description ??
      OperationResponsesDict[status];

    //responseDecoratorsConfig

    const apiResponseDecorator = ApiResponse({
      status: Number(status),
      description,
      schema,
    });
    decoratorsArr.push(apiResponseDecorator);
  });
  if (modelsToConfig.length > 0) {
    const apiExtraModelsDecorator = ApiExtraModels(...modelsToConfig);
    decoratorsArr.unshift(apiExtraModelsDecorator);
  }

  // applyDecorators
  return applyDecorators(...decoratorsArr);
};

DetailedDefaultResponses({ status: 200 });

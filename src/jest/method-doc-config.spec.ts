import * as swagger from '@nestjs/swagger';
import { MethodDocConfig } from '../method-main-generator/decorators/method-doc-config';
import * as detailedDefaultResponses from '../responses-generator/decorators/detailed-default-responses';
import { statusConfigPatternsDict } from '../responses-generator/dicts/status-config-patterns-dict';
import { ObjGenModes } from '../responses-generator/enums/obj-gen-modes.enum';
import { UserModel } from '../swagger-config/models/response-models/swagger-user.model';
import { CreateUserApiBodyConfig } from '../swagger-config/objects/api-body';
import { CreateUserApiOperationConfig } from '../swagger-config/objects/api-operation';
import { ShowUserApiParamConfigObject } from '../swagger-config/objects/api-param';
import { ListUsersWithQueryParams } from '../swagger-config/objects/api-query';

/**
 * Bellow is a very important workaorund to make spyOn's works properly, due to current TS has a compiule issue when export modules that prevents jest to redefine it.
 *
 * More information in: https://stackoverflow.com/a/72885576/20184670
 *
 */

jest.mock('@nestjs/swagger', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@nestjs/swagger'),
  };
});

describe('Test MethodDocConfig', () => {
  const basicDefautlsObjects = [
    {
      config: statusConfigPatternsDict.standardGet,
      mode: ObjGenModes.RemoveValues,
      statusCodes: [200, 401, 403],
    },
  ];
  const detailedDefaultsObjects = [
    {
      status: 200,
      description: 'Ok',
      model: UserModel,
      modelConfig: 'array',
    },
    {
      status: 400,
      description: 'Bad Request',
    },
    {
      status: 401,
    },
  ];

  const apiResponseSpy = jest.spyOn(swagger, 'ApiResponse');
  const apiOperationSpy = jest.spyOn(swagger, 'ApiOperation');
  const apiBodySpy = jest.spyOn(swagger, 'ApiBody');
  const apiParamSpy = jest.spyOn(swagger, 'ApiParam');
  const apiQuerySpy = jest.spyOn(swagger, 'ApiQuery');
  const reponsesDecoratorsSpy = jest.spyOn(
    detailedDefaultResponses,
    'DetailedDefaultResponses',
  );

  describe('Test full args simple call', () => {
    it('Should call Swagger ApiDecs 6 times, and ApiBody, ApiParam, ApiQuery and ApiOperation one time each', () => {
      MethodDocConfig({
        apiOperation: CreateUserApiOperationConfig,
        apiBody: CreateUserApiBodyConfig,
        apiParam: ShowUserApiParamConfigObject,
        apiQuery: ListUsersWithQueryParams,
        responses: {
          basicDefaults: basicDefautlsObjects[0],
          detailedDefaults: [...detailedDefaultsObjects],
        },
      });

      expect(apiOperationSpy).toBeCalledTimes(1);
      expect(apiBodySpy).toBeCalledTimes(1);
      expect(apiParamSpy).toBeCalledTimes(1);
      expect(apiQuerySpy).toBeCalledTimes(1);
      expect(apiResponseSpy).toBeCalledTimes(6);

      jest.clearAllMocks;
    });
    it('Should call Api Methods with correct Params', () => {
      MethodDocConfig({
        apiOperation: CreateUserApiOperationConfig,
        apiBody: CreateUserApiBodyConfig,
        apiParam: ShowUserApiParamConfigObject,
        apiQuery: ListUsersWithQueryParams,
        responses: {
          basicDefaults: basicDefautlsObjects[0],
          detailedDefaults: [...detailedDefaultsObjects],
        },
      });

      expect(apiOperationSpy).toBeCalledWith(CreateUserApiOperationConfig);
      expect(apiBodySpy).toBeCalledWith(CreateUserApiBodyConfig);
      expect(apiParamSpy).toBeCalledWith(ShowUserApiParamConfigObject);
      expect(apiQuerySpy).toBeCalledWith(ListUsersWithQueryParams);
      expect(reponsesDecoratorsSpy).toBeCalledWith(
        basicDefautlsObjects[0],
        ...detailedDefaultsObjects,
      );
    });
  });
});

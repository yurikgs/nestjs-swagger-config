import * as swagger from '@nestjs/swagger';
import { getSchemaPath } from '@nestjs/swagger';
import { DetailedDefaultResponses } from '../responses-generator/decorators/detailed-default-responses';
import { OperationsDefaultResponses } from '../responses-generator/decorators/operations-default-responses';
import { statusConfigPatternsDict } from '../responses-generator/dicts/status-config-patterns-dict';
import { ObjGenModes } from '../responses-generator/enums/obj-gen-modes.enum';
import { UserModel } from '../swagger-config/models/response-models/swagger-user.model';

jest.mock('@nestjs/swagger', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@nestjs/swagger'),
  };
});

describe('Test DetailedDefaultResponses', () => {
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

  const apiCallsObjects = [
    { status: 400, description: 'Bad Request' },
    { status: 404, description: 'Not Found' },
    { status: 408, description: 'Request Timeout' },
    { status: 500, description: 'Internal Server Error' },
    { status: 401, description: 'Unauthorized' },
    {
      status: 200,
      description: 'Ok',
      schema: {
        items: {
          allOf: [
            {
              $ref: getSchemaPath(UserModel),
            },
          ],
        },
      },
    },
  ];

  const apiResponseSpy = jest.spyOn(swagger, 'ApiResponse');

  DetailedDefaultResponses({
    config: statusConfigPatternsDict.standardGet,
    mode: ObjGenModes.RemoveValues,
    statusCodes: [200, 401, 403],
  });

  describe('Test simple basic defaults object call', () => {
    it('Should call ApiResponses 4 times', () => {
      expect(apiResponseSpy).toBeCalledTimes(4);
    });
    it('Should be called with corret params', () => {
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[0]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[1]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[2]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[3]);
      apiResponseSpy.mockClear();
    });
  });

  describe('Test simple basic defaults and some detailed defaults objects call', () => {
    it('Should call ApiResponses 6 times', () => {
      DetailedDefaultResponses(
        basicDefautlsObjects[0],
        detailedDefaultsObjects[0],
        detailedDefaultsObjects[1],
        detailedDefaultsObjects[2],
      );

      expect(apiResponseSpy).toBeCalledTimes(6);
      apiResponseSpy.mockClear();
    });
    it('Should be called with correct params', () => {
      DetailedDefaultResponses(
        basicDefautlsObjects[0],
        detailedDefaultsObjects[0],
        detailedDefaultsObjects[1],
        detailedDefaultsObjects[2],
      );

      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[0]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[1]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[2]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[3]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[4]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[5]);

      apiResponseSpy.mockClear();
    });
  });

  describe('Test some detailed defaults objects call', () => {
    it('Should call Api Responses 2 times', () => {
      DetailedDefaultResponses(
        detailedDefaultsObjects[0],
        detailedDefaultsObjects[2],
      );
      expect(apiResponseSpy).toBeCalledTimes(2);
      apiResponseSpy.mockClear();
    });
    it('Should be called with the correct params', () => {
      DetailedDefaultResponses(
        detailedDefaultsObjects[0],
        detailedDefaultsObjects[2],
      );
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[4]);
      expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[5]);
    });
  });
});

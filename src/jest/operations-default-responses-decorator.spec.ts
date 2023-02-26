import { BadRequestException } from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { OperationsDefaultResponses } from '../responses-generator/decorators/operations-default-responses';
import { statusConfigPatternsDict } from '../responses-generator/dicts/status-config-patterns-dict';
import { ObjGenModes } from '../responses-generator/enums/obj-gen-modes.enum';

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

describe('Test OperationsDefaultResponses', () => {
  const defaultConfigsObjects = {
    200: { status: 200, description: 'OK' },
    201: { status: 201, description: 'Created' },
    204: { status: 204, description: 'No Content' },
    400: { status: 400, description: 'Bad Request' },
    401: { status: 401, description: 'Unauthorized' },
    403: { status: 403, description: 'Forbidden' },
    404: { status: 404, description: 'Not Found' },
    406: { status: 406, description: 'Not Acceptable' },
    408: { status: 408, description: 'Request Timeout' },
    410: { status: 410, description: 'Gone' },
    418: {
      status: 418,
      description: `I'm a teapot: The server refuses the attempt to brew coffee with a teapot. See: Hyper Text Coffee Pot Control Protocol`,
    },
    500: { status: 500, description: 'Internal Server Error' },
  };

  const apiResponseSpy = jest.spyOn(swagger, 'ApiResponse');
  describe('Test simple Standard Get call', () => {
    it('Should call ApiResponse 7 times', () => {
      OperationsDefaultResponses(statusConfigPatternsDict.standardGet);
      expect(apiResponseSpy).toBeCalledTimes(7);
      apiResponseSpy.mockClear();
    });
    it('Should be called with correct params', () => {
      OperationsDefaultResponses(statusConfigPatternsDict.standardGet);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[200]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[400]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[401]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[403]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[404]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[408]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[500]);
      apiResponseSpy.mockClear();
    });
  });

  describe('Test simple Standard Patch call', () => {
    it('Should call ApiResponse 7 times', () => {
      OperationsDefaultResponses(statusConfigPatternsDict.standardPost);
      expect(apiResponseSpy).toBeCalledTimes(7);
      apiResponseSpy.mockClear();
    });
    it('Should be called with correct params', () => {
      OperationsDefaultResponses(statusConfigPatternsDict.standardPost);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[201]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[400]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[401]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[403]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[404]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[408]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[500]);
      apiResponseSpy.mockClear();
    });
  });

  describe('Test simple Standard Put removing some status', () => {
    it('Should call ApiResponse 5 times', () => {
      OperationsDefaultResponses(
        statusConfigPatternsDict.standardPut,
        ObjGenModes.RemoveValues,
        400,
        400,
        408,
        410,
        -1,
      );
      expect(apiResponseSpy).toBeCalledTimes(5);
      apiResponseSpy.mockClear();
    });
    it('Should be called with correct params', () => {
      OperationsDefaultResponses(
        statusConfigPatternsDict.standardPut,
        ObjGenModes.RemoveValues,
        400,
        400,
        408,
        410,
        -1,
      );
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[201]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[401]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[403]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[404]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[500]);
      apiResponseSpy.mockClear();
    });
  });

  describe('Test simple Standard Delete adding some status', () => {
    it('Should call ApiResponse 10 times', () => {
      OperationsDefaultResponses(
        statusConfigPatternsDict.standardDelete,
        ObjGenModes.AddValues,
        418,
        406,
        406,
        408,
        410,
        -1,
      );
      expect(apiResponseSpy).toBeCalledTimes(10);
      apiResponseSpy.mockClear();
    });
    it('Should be called with correct params', () => {
      OperationsDefaultResponses(
        statusConfigPatternsDict.standardDelete,
        ObjGenModes.AddValues,
        418,
        406,
        406,
        408,
        410,
        -1,
      );
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[204]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[400]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[401]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[403]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[404]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[406]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[408]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[410]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[418]);
      expect(apiResponseSpy).toHaveBeenCalledWith(defaultConfigsObjects[500]);
      apiResponseSpy.mockClear();
    });
  });

  describe('Test adding some status from zero', () => {
    it('Should be called 4 times', () => {
      OperationsDefaultResponses(
        statusConfigPatternsDict.fromZero,
        ObjGenModes.AddValues,
        418,
        406,
        406,
        408,
        410,
        -1,
      );
      expect(apiResponseSpy).toBeCalledTimes(4);
      apiResponseSpy.mockClear();
    });
    it('Should be called with the correct params', () => {
      OperationsDefaultResponses(
        statusConfigPatternsDict.fromZero,
        ObjGenModes.AddValues,
        418,
        406,
        406,
        408,
        410,
        -1,
      );
      expect(apiResponseSpy).toBeCalledWith(defaultConfigsObjects[406]);
      expect(apiResponseSpy).toBeCalledWith(defaultConfigsObjects[408]);
      expect(apiResponseSpy).toBeCalledWith(defaultConfigsObjects[410]);
      expect(apiResponseSpy).toBeCalledWith(defaultConfigsObjects[418]);
      apiResponseSpy.mockClear();
    });
  });

  describe('Test exception - remove from Zero not allowed', () => {
    it('Should throw an exception', () => {
      expect(() => {
        OperationsDefaultResponses(
          statusConfigPatternsDict.fromZero,
          ObjGenModes.RemoveValues,
          408,
        );
      }).toThrow(BadRequestException);
      expect(() => {
        OperationsDefaultResponses(
          statusConfigPatternsDict.fromZero,
          ObjGenModes.RemoveValues,
          408,
        );
      }).toThrow('Please make sure you are sending the config set');
      apiResponseSpy.mockClear();
    });
  });
});

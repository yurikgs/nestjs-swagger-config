"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger = require("@nestjs/swagger");
const operations_default_responses_1 = require("../responses-generator/decorators/operations-default-responses");
const status_config_patterns_dict_1 = require("../responses-generator/dicts/status-config-patterns-dict");
const obj_gen_modes_enum_1 = require("../responses-generator/enums/obj-gen-modes.enum");
jest.mock('@nestjs/swagger', () => {
    return Object.assign({ __esModule: true }, jest.requireActual('@nestjs/swagger'));
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
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardGet);
            expect(apiResponseSpy).toBeCalledTimes(7);
            apiResponseSpy.mockClear();
        });
        it('Should be called with correct params', () => {
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardGet);
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
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPost);
            expect(apiResponseSpy).toBeCalledTimes(7);
            apiResponseSpy.mockClear();
        });
        it('Should be called with correct params', () => {
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPost);
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
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPut, obj_gen_modes_enum_1.ObjGenModes.RemoveValues, 400, 400, 408, 410, -1);
            expect(apiResponseSpy).toBeCalledTimes(5);
            apiResponseSpy.mockClear();
        });
        it('Should be called with correct params', () => {
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPut, obj_gen_modes_enum_1.ObjGenModes.RemoveValues, 400, 400, 408, 410, -1);
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
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardDelete, obj_gen_modes_enum_1.ObjGenModes.AddValues, 418, 406, 406, 408, 410, -1);
            expect(apiResponseSpy).toBeCalledTimes(10);
            apiResponseSpy.mockClear();
        });
        it('Should be called with correct params', () => {
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardDelete, obj_gen_modes_enum_1.ObjGenModes.AddValues, 418, 406, 406, 408, 410, -1);
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
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.fromZero, obj_gen_modes_enum_1.ObjGenModes.AddValues, 418, 406, 406, 408, 410, -1);
            expect(apiResponseSpy).toBeCalledTimes(4);
            apiResponseSpy.mockClear();
        });
        it('Should be called with the correct params', () => {
            (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.fromZero, obj_gen_modes_enum_1.ObjGenModes.AddValues, 418, 406, 406, 408, 410, -1);
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
                (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.fromZero, obj_gen_modes_enum_1.ObjGenModes.RemoveValues, 408);
            }).toThrow(common_1.BadRequestException);
            expect(() => {
                (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.fromZero, obj_gen_modes_enum_1.ObjGenModes.RemoveValues, 408);
            }).toThrow('Please make sure you are sending the config set');
            apiResponseSpy.mockClear();
        });
    });
});

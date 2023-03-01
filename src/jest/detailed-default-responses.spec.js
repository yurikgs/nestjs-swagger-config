"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const detailed_default_responses_1 = require("../responses-generator/decorators/detailed-default-responses");
const status_config_patterns_dict_1 = require("../responses-generator/dicts/status-config-patterns-dict");
const obj_gen_modes_enum_1 = require("../responses-generator/enums/obj-gen-modes.enum");
const swagger_user_model_1 = require("../swagger-config/models/response-models/swagger-user.model");
jest.mock('@nestjs/swagger', () => {
    return Object.assign({ __esModule: true }, jest.requireActual('@nestjs/swagger'));
});
describe('Test DetailedDefaultResponses', () => {
    const basicDefautlsObjects = [
        {
            config: status_config_patterns_dict_1.statusConfigPatternsDict.standardGet,
            mode: obj_gen_modes_enum_1.ObjGenModes.RemoveValues,
            statusCodes: [200, 401, 403],
        },
    ];
    const detailedDefaultsObjects = [
        {
            status: 200,
            description: 'Ok',
            model: swagger_user_model_1.UserModel,
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
                            $ref: (0, swagger_1.getSchemaPath)(swagger_user_model_1.UserModel),
                        },
                    ],
                },
            },
        },
    ];
    const apiResponseSpy = jest.spyOn(swagger, 'ApiResponse');
    (0, detailed_default_responses_1.DetailedDefaultResponses)({
        config: status_config_patterns_dict_1.statusConfigPatternsDict.standardGet,
        mode: obj_gen_modes_enum_1.ObjGenModes.RemoveValues,
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
            (0, detailed_default_responses_1.DetailedDefaultResponses)(basicDefautlsObjects[0], detailedDefaultsObjects[0], detailedDefaultsObjects[1], detailedDefaultsObjects[2]);
            expect(apiResponseSpy).toBeCalledTimes(6);
            apiResponseSpy.mockClear();
        });
        it('Should be called with correct params', () => {
            (0, detailed_default_responses_1.DetailedDefaultResponses)(basicDefautlsObjects[0], detailedDefaultsObjects[0], detailedDefaultsObjects[1], detailedDefaultsObjects[2]);
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
            (0, detailed_default_responses_1.DetailedDefaultResponses)(detailedDefaultsObjects[0], detailedDefaultsObjects[2]);
            expect(apiResponseSpy).toBeCalledTimes(2);
            apiResponseSpy.mockClear();
        });
        it('Should be called with the correct params', () => {
            (0, detailed_default_responses_1.DetailedDefaultResponses)(detailedDefaultsObjects[0], detailedDefaultsObjects[2]);
            expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[4]);
            expect(apiResponseSpy).toBeCalledWith(apiCallsObjects[5]);
        });
    });
});

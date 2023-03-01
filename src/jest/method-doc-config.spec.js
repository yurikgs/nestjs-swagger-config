"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger = require("@nestjs/swagger");
const method_doc_config_1 = require("../method-main-generator/decorators/method-doc-config");
const detailedDefaultResponses = require("../responses-generator/decorators/detailed-default-responses");
const status_config_patterns_dict_1 = require("../responses-generator/dicts/status-config-patterns-dict");
const obj_gen_modes_enum_1 = require("../responses-generator/enums/obj-gen-modes.enum");
const swagger_user_model_1 = require("../swagger-config/models/response-models/swagger-user.model");
const api_body_1 = require("../swagger-config/objects/api-body");
const api_operation_1 = require("../swagger-config/objects/api-operation");
const api_param_1 = require("../swagger-config/objects/api-param");
const api_query_1 = require("../swagger-config/objects/api-query");
jest.mock('@nestjs/swagger', () => {
    return Object.assign({ __esModule: true }, jest.requireActual('@nestjs/swagger'));
});
describe('Test MethodDocConfig', () => {
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
    const apiResponseSpy = jest.spyOn(swagger, 'ApiResponse');
    const apiOperationSpy = jest.spyOn(swagger, 'ApiOperation');
    const apiBodySpy = jest.spyOn(swagger, 'ApiBody');
    const apiParamSpy = jest.spyOn(swagger, 'ApiParam');
    const apiQuerySpy = jest.spyOn(swagger, 'ApiQuery');
    const reponsesDecoratorsSpy = jest.spyOn(detailedDefaultResponses, 'DetailedDefaultResponses');
    describe('Test full args simple call', () => {
        it('Should call Swagger ApiDecs 6 times, and ApiBody, ApiParam, ApiQuery and ApiOperation one time each', () => {
            (0, method_doc_config_1.MethodDocConfig)({
                apiOperation: api_operation_1.CreateUserApiOperationConfig,
                apiBody: api_body_1.CreateUserApiBodyConfig,
                apiParam: api_param_1.ShowUserApiParamConfigObject,
                apiQuery: api_query_1.ListUsersWithQueryParams,
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
            (0, method_doc_config_1.MethodDocConfig)({
                apiOperation: api_operation_1.CreateUserApiOperationConfig,
                apiBody: api_body_1.CreateUserApiBodyConfig,
                apiParam: api_param_1.ShowUserApiParamConfigObject,
                apiQuery: api_query_1.ListUsersWithQueryParams,
                responses: {
                    basicDefaults: basicDefautlsObjects[0],
                    detailedDefaults: [...detailedDefaultsObjects],
                },
            });
            expect(apiOperationSpy).toBeCalledWith(api_operation_1.CreateUserApiOperationConfig);
            expect(apiBodySpy).toBeCalledWith(api_body_1.CreateUserApiBodyConfig);
            expect(apiParamSpy).toBeCalledWith(api_param_1.ShowUserApiParamConfigObject);
            expect(apiQuerySpy).toBeCalledWith(api_query_1.ListUsersWithQueryParams);
            expect(reponsesDecoratorsSpy).toBeCalledWith(basicDefautlsObjects[0], ...detailedDefaultsObjects);
        });
    });
});

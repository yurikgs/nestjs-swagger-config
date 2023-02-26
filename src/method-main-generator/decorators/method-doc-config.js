"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodDocConfig = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const detailed_default_responses_1 = require("../../responses-generator/decorators/detailed-default-responses");
const MethodDocConfig = (configObject) => {
    var _a, _b, _c;
    if (configObject.responses &&
        (configObject.responses.basicDefaults ||
            configObject.responses.detailedDefaults)) {
        if (configObject.responses.apiResponse) {
            throw new common_1.BadRequestException('ERROR_MESSAGE_TO_CONFIG');
        }
    }
    if (configObject.responses && configObject.responses.apiResponse) {
        if (configObject.responses.basicDefaults ||
            configObject.responses.detailedDefaults) {
            throw new common_1.BadRequestException('ERROR_MESSAGE_TO_CONFIG');
        }
    }
    const decoratorsArr = [];
    if (configObject.apiOperation) {
        const apiOperationDec = (0, swagger_1.ApiOperation)(configObject.apiOperation);
        decoratorsArr.push(apiOperationDec);
    }
    if (configObject.apiBody) {
        const apiBodyDec = (0, swagger_1.ApiBody)(configObject.apiBody);
        decoratorsArr.push(apiBodyDec);
    }
    if (configObject.apiParam) {
        const apiParamDec = (0, swagger_1.ApiParam)(configObject.apiParam);
        decoratorsArr.push(apiParamDec);
    }
    if (configObject.apiQuery) {
        const apiQueryDec = (0, swagger_1.ApiQuery)(configObject.apiQuery);
        decoratorsArr.push(apiQueryDec);
    }
    if (configObject.responses) {
        const responsesDecorators = [];
        const basicDefault = (_a = configObject.responses.basicDefaults) !== null && _a !== void 0 ? _a : undefined;
        const detailedDefaults = (_b = configObject.responses.detailedDefaults) !== null && _b !== void 0 ? _b : undefined;
        const apiResponses = (_c = configObject.responses.apiResponse) !== null && _c !== void 0 ? _c : undefined;
        if (basicDefault || detailedDefaults) {
            let basicAndDetailedDefaultResponses;
            if (basicDefault && detailedDefaults) {
                basicAndDetailedDefaultResponses = (0, detailed_default_responses_1.DetailedDefaultResponses)(basicDefault, ...detailedDefaults);
            }
            else if (basicDefault) {
                basicAndDetailedDefaultResponses =
                    (0, detailed_default_responses_1.DetailedDefaultResponses)(basicDefault);
            }
            else {
                basicAndDetailedDefaultResponses = (0, detailed_default_responses_1.DetailedDefaultResponses)(...detailedDefaults);
            }
            responsesDecorators.push(basicAndDetailedDefaultResponses);
        }
        else {
            if (apiResponses) {
                apiResponses.forEach((responseConfig) => {
                    responsesDecorators.push((0, swagger_1.ApiResponse)(responseConfig));
                });
            }
        }
        decoratorsArr.push(...responsesDecorators);
    }
    return (0, common_1.applyDecorators)(...decoratorsArr);
};
exports.MethodDocConfig = MethodDocConfig;
//# sourceMappingURL=method-doc-config.js.map
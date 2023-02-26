"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedDefaultResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const operations_default_responses_1 = require("./operations-default-responses");
const config_detailed_status_object_1 = require("../helpers/config-detailed-status-object");
const operation_responses_dict_1 = require("../dicts/operation-responses.dict");
const craft_response_schema_object_1 = require("../helpers/craft-response-schema-object");
const preconfig_detailed_defaults_1 = require("../helpers/preconfig-detailed-defaults");
const DetailedDefaultResponses = (basicOrDetailedDefaults, ...detailedDefaults) => {
    var _a;
    let basicDefaults;
    if (Object.prototype.hasOwnProperty.call(basicOrDetailedDefaults, 'config')) {
        basicDefaults = basicOrDetailedDefaults;
    }
    else {
        detailedDefaults.push(basicOrDetailedDefaults);
    }
    if (!basicDefaults && !detailedDefaults) {
        common_1.Logger.error('Please send any defaults to config');
        throw new common_1.BadRequestException('Please send any defaults to config');
    }
    if (basicDefaults && !detailedDefaults.length) {
        const statusCodes = (_a = basicDefaults.statusCodes) !== null && _a !== void 0 ? _a : [];
        return (0, common_1.applyDecorators)((0, operations_default_responses_1.OperationsDefaultResponses)(basicDefaults.config, basicDefaults.mode, ...statusCodes));
    }
    detailedDefaults = (0, preconfig_detailed_defaults_1.preconfigDetailedDefaults)(detailedDefaults);
    const detailedDefaultsObject = (0, config_detailed_status_object_1.configDetailedStatusObject)(basicDefaults, ...detailedDefaults);
    const decoratorsArr = [];
    const modelsToConfig = [];
    Object.keys(detailedDefaultsObject).forEach((status) => {
        var _a;
        let schema = void 0;
        if (detailedDefaultsObject[status].model) {
            modelsToConfig.push(detailedDefaultsObject[status].model);
            schema = (0, craft_response_schema_object_1.craftResponseSchemaObject)(detailedDefaultsObject[status]);
        }
        const description = (_a = detailedDefaultsObject[status].description) !== null && _a !== void 0 ? _a : operation_responses_dict_1.OperationResponsesDict[status];
        const apiResponseDecorator = (0, swagger_1.ApiResponse)({
            status: Number(status),
            description,
            schema,
        });
        decoratorsArr.push(apiResponseDecorator);
    });
    if (modelsToConfig.length > 0) {
        const apiExtraModelsDecorator = (0, swagger_1.ApiExtraModels)(...modelsToConfig);
        decoratorsArr.unshift(apiExtraModelsDecorator);
    }
    return (0, common_1.applyDecorators)(...decoratorsArr);
};
exports.DetailedDefaultResponses = DetailedDefaultResponses;
(0, exports.DetailedDefaultResponses)({ status: 200 });
//# sourceMappingURL=detailed-default-responses.js.map
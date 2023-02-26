"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsDefaultResponses = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_possible_status_object_1 = require("../helpers/config-possible-status-object");
const OperationsDefaultResponses = (config, mode, ...statusCodes) => {
    const statusResponsesObject = (0, config_possible_status_object_1.configPossibleStatusObject)(config, mode, ...statusCodes);
    const apiResponses = [];
    Object.keys(statusResponsesObject).forEach((key) => {
        apiResponses.push((0, swagger_1.ApiResponse)({
            status: Number(key),
            description: statusResponsesObject[key],
        }));
    });
    return (0, common_1.applyDecorators)(...apiResponses);
};
exports.OperationsDefaultResponses = OperationsDefaultResponses;
//# sourceMappingURL=operations-default-responses.js.map
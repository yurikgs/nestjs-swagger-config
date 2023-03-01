"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configPossibleStatusObject = void 0;
const create_possible_status_object_1 = require("./create-possible-status-object");
const create_status_defaults_array_1 = require("./create-status-defaults-array");
function configPossibleStatusObject(config, mode, ...statusCodes) {
    const statusConfigArr = (0, create_status_defaults_array_1.createStatusDefaultsArray)(config, mode, ...statusCodes);
    const resp = (0, create_possible_status_object_1.createPossibleStatusObject)(...statusConfigArr);
    return resp;
}
exports.configPossibleStatusObject = configPossibleStatusObject;

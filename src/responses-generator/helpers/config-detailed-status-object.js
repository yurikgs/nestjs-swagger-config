"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDetailedStatusObject = void 0;
const basic_to_detailed_array_1 = require("./basic-to-detailed-array");
const create_basic_and_detailed_status_object_1 = require("./create-basic-and-detailed-status-object");
const create_detailed_defaults_array_1 = require("./create-detailed-defaults-array");
const create_status_defaults_array_1 = require("./create-status-defaults-array");
const remove_duplicated_detailed_1 = require("./remove-duplicated-detailed");
function configDetailedStatusObject(basicDefaults, ...detailedDefaults) {
    var _a;
    let statusConfigArr = [];
    let detailedDefaultsArr = (0, create_detailed_defaults_array_1.createDetailedDefaultsArray)(detailedDefaults);
    if (basicDefaults) {
        const statusCodes = (_a = basicDefaults.statusCodes) !== null && _a !== void 0 ? _a : [];
        const basicDefaultsArr = (0, create_status_defaults_array_1.createStatusDefaultsArray)(basicDefaults.config, basicDefaults.mode, ...statusCodes);
        const basicToDetailedArr = (0, basic_to_detailed_array_1.basicToDetailedArray)(basicDefaultsArr);
        detailedDefaultsArr.push(...basicToDetailedArr);
    }
    detailedDefaultsArr = (0, remove_duplicated_detailed_1.removeDuplicatedDetailed)(detailedDefaultsArr);
    statusConfigArr = detailedDefaultsArr;
    const statusConfigObject = (0, create_basic_and_detailed_status_object_1.createBasicAndDetailedStatusObject)(statusConfigArr);
    return statusConfigObject;
}
exports.configDetailedStatusObject = configDetailedStatusObject;
//# sourceMappingURL=config-detailed-status-object.js.map
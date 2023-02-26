"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBasicAndDetailedStatusObject = void 0;
const detailed_default_properties_dict_1 = require("../dicts/detailed-default-properties.dict");
function createBasicAndDetailedStatusObject(statusConfigArr) {
    const statusConfigObject = {};
    statusConfigArr.forEach((statusConfig) => {
        let statusObject = {};
        Object.keys(detailed_default_properties_dict_1.detailedDefaultPropertiesDict).forEach((propKey, propIndex) => {
            statusConfigObject[statusConfig[0]] = {};
            statusObject[propKey] = statusConfig[propIndex + 1];
        });
        statusConfigObject[statusConfig[0]] = statusObject;
    });
    return statusConfigObject;
}
exports.createBasicAndDetailedStatusObject = createBasicAndDetailedStatusObject;
//# sourceMappingURL=create-basic-and-detailed-status-object.js.map
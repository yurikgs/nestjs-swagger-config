"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDetailedDefaultsArray = void 0;
function createDetailedDefaultsArray(detailedDefaults) {
    const statusConfigArr = [];
    detailedDefaults.forEach((detailedDefaultsObject) => {
        const newStatusConfig = [];
        Object.keys(detailedDefaultsObject).forEach((objProp) => {
            newStatusConfig.push(detailedDefaultsObject[objProp]);
        });
        statusConfigArr.push(newStatusConfig);
    });
    return statusConfigArr;
}
exports.createDetailedDefaultsArray = createDetailedDefaultsArray;

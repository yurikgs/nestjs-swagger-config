"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preconfigDetailedDefaults = void 0;
const detailed_default_properties_dict_1 = require("../dicts/detailed-default-properties.dict");
function preconfigDetailedDefaults(detailedDefaults) {
    const newDetailedDefaultsArr = [];
    detailedDefaults.forEach((object) => {
        const presetedObject = {};
        presetedObject['status'] = object['status'];
        Object.keys(detailed_default_properties_dict_1.detailedDefaultPropertiesDict).forEach((propKey) => {
            var _a;
            if (propKey != 'status') {
                presetedObject[`${propKey}`] = (_a = object[`${propKey}`]) !== null && _a !== void 0 ? _a : undefined;
            }
        });
        newDetailedDefaultsArr.push(presetedObject);
    });
    return newDetailedDefaultsArr;
}
exports.preconfigDetailedDefaults = preconfigDetailedDefaults;

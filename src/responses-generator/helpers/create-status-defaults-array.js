"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStatusDefaultsArray = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const services_1 = require("@nestjs/common/services");
const log_messages_dict_1 = require("../dicts/log-messages.dict");
const obj_gen_modes_enum_1 = require("../enums/obj-gen-modes.enum");
function createStatusDefaultsArray(config, mode, ...statusCodes) {
    const statusConfigStrArr = config.split(' ').filter((value) => {
        if (value != '' && !isNaN(Number(value)) && !value.includes('e')) {
            return true;
        }
    });
    let statusConfigArr = statusConfigStrArr.map((value) => Number(value));
    if (!statusConfigArr.length &&
        mode == obj_gen_modes_enum_1.ObjGenModes.AddValues &&
        !statusCodes.length) {
        services_1.Logger.error(log_messages_dict_1.logMessagesDict.MISSING_APIRESP_CODES_ON_ADDVALUES_MODE);
        throw new exceptions_1.BadRequestException(log_messages_dict_1.logMessagesDict.MISSING_APIRESP_CODES_ON_ADDVALUES_MODE);
    }
    if (mode != 0 && !mode && !statusConfigArr.length) {
        services_1.Logger.error(log_messages_dict_1.logMessagesDict.MISSING_APIRESP_CODES_OR_PATTERNS);
        throw new exceptions_1.BadRequestException(log_messages_dict_1.logMessagesDict.MISSING_APIRESP_CODES_OR_PATTERNS);
    }
    if (!statusConfigArr.length && mode != obj_gen_modes_enum_1.ObjGenModes.AddValues) {
        services_1.Logger.error(log_messages_dict_1.logMessagesDict.MISSING_APIRESP_CONFIG);
        throw new exceptions_1.BadRequestException(log_messages_dict_1.logMessagesDict.MISSING_APIRESP_CONFIG);
    }
    if (mode == obj_gen_modes_enum_1.ObjGenModes.AddValues) {
        statusCodes.forEach((code) => {
            if (code) {
                statusConfigArr.push(code);
            }
        });
    }
    if (mode == obj_gen_modes_enum_1.ObjGenModes.RemoveValues) {
        statusCodes === null || statusCodes === void 0 ? void 0 : statusCodes.forEach((code) => {
            if (statusConfigArr.includes(code)) {
                statusConfigArr = statusConfigArr.filter((value) => value != code);
            }
        });
    }
    return statusConfigArr;
}
exports.createStatusDefaultsArray = createStatusDefaultsArray;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPossibleStatusObject = void 0;
const operation_responses_dict_1 = require("../dicts/operation-responses.dict");
function createPossibleStatusObject(...args) {
    const entries = Object.entries(operation_responses_dict_1.OperationResponsesDict);
    const possibleStatus = {};
    args.forEach((arg) => {
        entries.forEach((entry) => {
            if (arg == Number(entry[0])) {
                possibleStatus[entry[0]] = entry[1];
            }
        });
    });
    return possibleStatus;
}
exports.createPossibleStatusObject = createPossibleStatusObject;
//# sourceMappingURL=create-possible-status-object.js.map
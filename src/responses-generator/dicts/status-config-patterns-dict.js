"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusConfigPatternsDict = void 0;
exports.statusConfigPatternsDict = {
    standardGet: '200 400 401 403 404 408 500',
    standardGetById: '200 400 401 404 403 408 500',
    standardPost: '201 400 401 403 404 408 500',
    standardPut: '201 400 401 403 404 408 500',
    standardPatch: '201 400 401 403 404 408 500',
    standardDelete: '204 400 401 403 404 408 500',
    fromZero: ' ',
};

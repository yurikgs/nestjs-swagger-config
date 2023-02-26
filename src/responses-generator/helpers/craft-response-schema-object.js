"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.craftResponseSchemaObject = void 0;
const swagger_1 = require("@nestjs/swagger");
function craftResponseSchemaObject(schemaConfig) {
    const schema = {};
    if (schemaConfig.model) {
        if (schemaConfig.modelConfig == 'array') {
            schema['items'] = {
                allOf: [
                    {
                        $ref: (0, swagger_1.getSchemaPath)(schemaConfig.model),
                    },
                ],
            };
        }
        else {
            schema['$ref'] = (0, swagger_1.getSchemaPath)(schemaConfig.model);
        }
    }
    return schema;
}
exports.craftResponseSchemaObject = craftResponseSchemaObject;
//# sourceMappingURL=craft-response-schema-object.js.map
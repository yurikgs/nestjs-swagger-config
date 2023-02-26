import { getSchemaPath } from '@nestjs/swagger';
import { anyObject } from '../types/anyObject';

export function craftResponseSchemaObject(schemaConfig: anyObject) {
  const schema = {};

  // TODO: improve this rules
  if (schemaConfig.model) {
    if (schemaConfig.modelConfig == 'array') {
      schema['items'] = {
        allOf: [
          {
            $ref: getSchemaPath(schemaConfig.model),
          },
        ],
      };
    } else {
      schema['$ref'] = getSchemaPath(schemaConfig.model);
    }
  }

  return schema;
}

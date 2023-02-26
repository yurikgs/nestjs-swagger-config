import { ApiBodyOptions, ApiOperationOptions, ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ResponsesConfigObject } from './responses-config-object';
export type MethodDocConfigObject = {
    responses?: ResponsesConfigObject;
    apiOperation?: ApiOperationOptions;
    apiBody?: ApiBodyOptions;
    apiParam?: ApiParamOptions;
    apiQuery?: ApiQueryOptions;
};

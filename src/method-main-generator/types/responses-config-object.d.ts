import { ApiResponseOptions } from '@nestjs/swagger';
import { BasicDefaultsObject } from '../../responses-generator/types/basic-defaults-object';
import { DetailedDefaultsObject } from '../../responses-generator/types/detailed-defaults-object';
export type ResponsesConfigObject = {
    basicDefaults?: BasicDefaultsObject;
    detailedDefaults?: DetailedDefaultsObject[];
    apiResponse?: ApiResponseOptions[];
};

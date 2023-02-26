import { BasicDefaultsObject } from '../types/basic-defaults-object';
import { DetailedDefaultsObject } from '../types/detailed-defaults-object';
export declare const DetailedDefaultResponses: (basicOrDetailedDefaults?: BasicDefaultsObject | DetailedDefaultsObject, ...detailedDefaults: DetailedDefaultsObject[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

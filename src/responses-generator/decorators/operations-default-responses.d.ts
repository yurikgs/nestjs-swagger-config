import { ObjGenModes } from '../enums/obj-gen-modes.enum';
export declare const OperationsDefaultResponses: (config: string, mode?: ObjGenModes, ...statusCodes: number[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

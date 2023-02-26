import { MethodDocConfigObject } from '../types/method-doc-config-object';
export declare const MethodDocConfig: (configObject: MethodDocConfigObject) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

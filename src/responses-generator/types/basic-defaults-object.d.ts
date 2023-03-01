import { ObjGenModes } from '../enums/obj-gen-modes.enum';
export type BasicDefaultsObject = {
    config: string;
    mode?: ObjGenModes;
    statusCodes?: number[];
};

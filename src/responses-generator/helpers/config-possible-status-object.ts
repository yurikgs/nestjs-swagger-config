import { ObjGenModes } from '../enums/obj-gen-modes.enum';
import { createPossibleStatusObject } from './create-possible-status-object';
import { createStatusDefaultsArray } from './create-status-defaults-array';
export function configPossibleStatusObject(
  config: string,
  mode?: ObjGenModes,
  ...statusCodes: number[]
) {
  const statusConfigArr = createStatusDefaultsArray(
    config,
    mode,
    ...statusCodes,
  );

  const resp = createPossibleStatusObject(...statusConfigArr);
  return resp;
}

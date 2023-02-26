import { BadRequestException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';
import { logMessagesDict } from '../dicts/log-messages.dict';
import { ObjGenModes } from '../enums/obj-gen-modes.enum';

export function createStatusDefaultsArray(
  config: string,
  mode?: ObjGenModes,
  ...statusCodes: number[]
): number[] {
  // configs: standardGet, standardPost, standardPut, standardPatch, standardDelete, fromZero --create dict?
  const statusConfigStrArr = config.split(' ').filter((value) => {
    if (value != '' && !isNaN(Number(value)) && !value.includes('e')) {
      return true;
    }
  });
  let statusConfigArr = statusConfigStrArr.map((value) => Number(value));

  if (
    !statusConfigArr.length &&
    mode == ObjGenModes.AddValues &&
    !statusCodes.length
  ) {
    Logger.error(logMessagesDict.MISSING_APIRESP_CODES_ON_ADDVALUES_MODE);
    throw new BadRequestException(
      logMessagesDict.MISSING_APIRESP_CODES_ON_ADDVALUES_MODE,
    );
  }

  if (mode != 0 && !mode && !statusConfigArr.length) {
    Logger.error(logMessagesDict.MISSING_APIRESP_CODES_OR_PATTERNS);
    throw new BadRequestException(
      logMessagesDict.MISSING_APIRESP_CODES_OR_PATTERNS,
    );
  }

  if (!statusConfigArr.length && mode != ObjGenModes.AddValues) {
    Logger.error(logMessagesDict.MISSING_APIRESP_CONFIG);
    throw new BadRequestException(logMessagesDict.MISSING_APIRESP_CONFIG);
  }

  // Mode Select:
  if (mode == ObjGenModes.AddValues) {
    statusCodes.forEach((code) => {
      if (code) {
        statusConfigArr.push(code);
      }
    });
  }
  if (mode == ObjGenModes.RemoveValues) {
    statusCodes?.forEach((code) => {
      if (statusConfigArr.includes(code)) {
        statusConfigArr = statusConfigArr.filter((value) => value != code);
      }
    });
  }

  return statusConfigArr;
}

import { BasicDefaultsObject } from '../types/basic-defaults-object';
import { DetailedDefaultsObject } from '../types/detailed-defaults-object';
import { basicToDetailedArray } from './basic-to-detailed-array';
import { createBasicAndDetailedStatusObject } from './create-basic-and-detailed-status-object';
import { createDetailedDefaultsArray } from './create-detailed-defaults-array';
import { createStatusDefaultsArray } from './create-status-defaults-array';
import { removeDuplicatedDetailed } from './remove-duplicated-detailed';

export function configDetailedStatusObject(
  basicDefaults?: BasicDefaultsObject,
  ...detailedDefaults: DetailedDefaultsObject[]
) {
  let statusConfigArr = [];

  let detailedDefaultsArr = createDetailedDefaultsArray(detailedDefaults);

  if (basicDefaults) {
    const statusCodes = basicDefaults.statusCodes ?? [];
    const basicDefaultsArr = createStatusDefaultsArray(
      basicDefaults.config,
      basicDefaults.mode,
      ...statusCodes,
    );
    const basicToDetailedArr = basicToDetailedArray(basicDefaultsArr);
    detailedDefaultsArr.push(...basicToDetailedArr);
  }

  detailedDefaultsArr = removeDuplicatedDetailed(detailedDefaultsArr);
  statusConfigArr = detailedDefaultsArr;

  const statusConfigObject =
    createBasicAndDetailedStatusObject(statusConfigArr);

  return statusConfigObject;
}

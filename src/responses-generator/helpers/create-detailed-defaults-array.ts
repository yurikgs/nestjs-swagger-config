import { DetailedDefaultsObject } from '../types/detailed-defaults-object';

export function createDetailedDefaultsArray(
  detailedDefaults: DetailedDefaultsObject[],
): any[] {
  const statusConfigArr = [];
  detailedDefaults.forEach((detailedDefaultsObject) => {
    const newStatusConfig = [];
    Object.keys(detailedDefaultsObject).forEach((objProp) => {
      newStatusConfig.push(detailedDefaultsObject[objProp]);
    });
    statusConfigArr.push(newStatusConfig);
  });
  return statusConfigArr;
}

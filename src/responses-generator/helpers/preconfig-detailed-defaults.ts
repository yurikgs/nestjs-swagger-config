import { detailedDefaultPropertiesDict } from '../dicts/detailed-default-properties.dict';
import { DetailedDefaultsObject } from '../types/detailed-defaults-object';
// it actually fix the order of assigned properities. Improve this in a v2, use data structure better aproach
export function preconfigDetailedDefaults(
  detailedDefaults: DetailedDefaultsObject[],
) {
  const newDetailedDefaultsArr = [];
  detailedDefaults.forEach((object) => {
    const presetedObject = {};
    presetedObject['status'] = object['status'];
    Object.keys(detailedDefaultPropertiesDict).forEach((propKey) => {
      if (propKey != 'status') {
        presetedObject[`${propKey}`] = object[`${propKey}`] ?? undefined;
      }
    });
    newDetailedDefaultsArr.push(presetedObject);
  });
  return newDetailedDefaultsArr;
}

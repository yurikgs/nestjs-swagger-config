import { detailedDefaultPropertiesDict } from '../dicts/detailed-default-properties.dict';

export function createBasicAndDetailedStatusObject(statusConfigArr: any[]) {
  const statusConfigObject = {};
  statusConfigArr.forEach((statusConfig) => {
    // eslint-disable-next-line prefer-const
    let statusObject = {};
    Object.keys(detailedDefaultPropertiesDict).forEach((propKey, propIndex) => {
      statusConfigObject[statusConfig[0]] = {};

      statusObject[propKey] = statusConfig[propIndex + 1];
    });
    statusConfigObject[statusConfig[0]] = statusObject;
  });
  return statusConfigObject;
}

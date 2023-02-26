/**
 *
 * This method filter the http status code dict, returning only the enttries relative to the desired codes.
 */

import { OperationResponsesDict } from '../dicts/operation-responses.dict';

export function createPossibleStatusObject(...args: number[]) {
  const entries = Object.entries(OperationResponsesDict);
  const possibleStatus = {};
  args.forEach((arg) => {
    entries.forEach((entry) => {
      if (arg == Number(entry[0])) {
        possibleStatus[entry[0]] = entry[1];
      }
    });
  });
  return possibleStatus;
}

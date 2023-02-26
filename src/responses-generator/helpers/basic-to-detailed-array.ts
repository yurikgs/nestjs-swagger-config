export function basicToDetailedArray(basicArray: number[]): any[] {
  const detailedArr = basicArray.map((value) => {
    return [value];
  });
  return detailedArr;
}

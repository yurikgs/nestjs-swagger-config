export function removeDuplicatedDetailed(detailedDefaultsArr: any[][]) {
  
  detailedDefaultsArr.forEach((value) => {
    const auxArr = [...detailedDefaultsArr];
    const auxValuesAndLengthsArr = [];
    let auxElement = value;

    while (auxElement) {
      auxElement = auxArr.find((element) => element[0] == value[0]);
      if (auxElement) {
        auxValuesAndLengthsArr.push([auxElement, auxElement.length]);
        auxArr.splice(auxArr.indexOf(auxElement), 1);
      }
    }
    const finalArrElement = auxValuesAndLengthsArr.reduce(
      (accumulator, currentValue) =>
        accumulator[1] > currentValue[1] ? accumulator : currentValue,
      [],
    );
    auxArr.push(finalArrElement[0]);
    detailedDefaultsArr = auxArr;
  });
  return detailedDefaultsArr;
}

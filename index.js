function areBothObject({ valueOne, valueTwo }) {
    var bothNull = valueOne === null && valueTwo === null;
    var bothUndefined = valueOne === undefined && valueTwo === undefined;
    return (
      !bothNull &&
      !bothUndefined &&
      typeof valueOne === "object" &&
      typeof valueOne === "object"
    );
  }
  
  function areBothArray({ valueOne, valueTwo }) {
    return Array.isArray(valueOne) && Array.isArray(valueTwo);
  }
  
  function hasSameType({ valueOne, valueTwo }) {
    const bothArray = areBothArray({ valueOne, valueTwo });
    const bothNull = valueOne === null && valueTwo === null;
    const bothUndefined = valueOne === undefined && valueTwo === undefined;
    const bothBool =
      typeof valueOne === "boolean" && typeof valueTwo === "boolean";
    const bothString =
      typeof valueOne === "string" && typeof valueTwo === "string";
    const bothNumber =
      typeof valueOne === "number" && typeof valueTwo === "number";
    const bothObj =
      !bothArray &&
      !bothUndefined &&
      !bothNull &&
      areBothObject({ valueOne, valueTwo });
    return (
      bothArray ||
      bothNull ||
      bothUndefined ||
      bothBool ||
      bothObj ||
      bothString ||
      bothNumber
    );
  }
  
  function isEqual({ keyOne, keyTwo, valueOne, valueTwo }) {
    console.log(keyOne, keyTwo, valueOne, valueTwo);
    return areBothObject({ valueOne, valueTwo, keyOne, keyTwo })
      ? objectKeyEquality({ valueOne, valueTwo, keyOne, keyTwo })
      : keyOne === keyTwo;
  }
  
  function areKeysEqualInNumber({ valueOne, valueTwo }) {
    return valueOne.length === valueTwo.length;
  }
  
  function objectKeyEquality({ valueOne, valueTwo, keyOne, keyTwo }) {
    if (areBothObject({ valueOne, valueTwo })) {
      const objectOneEntries = Object.entries(valueOne);
      const objectTwoEntries = Object.entries(valueTwo);
      const areKeysEqualInNumber =
        objectOneEntries.length === objectTwoEntries.length;
      if (!areKeysEqualInNumber) {
        return false;
      }
    }
    return isEqual({ keyOne, keyTwo, valueOne, valueTwo });
  }
  
  export default function isSignatureEqual(objectOne, objectTwo) {
    const objectOneEntries = Object.entries(objectOne);
    const objectTwoEntries = Object.entries(objectTwo);
    if (
      !areKeysEqualInNumber({
        valueOne: objectOneEntries,
        valueTwo: objectTwoEntries
      })
    ) {
      return false;
    }
    return objectOneEntries.every(([keyOne, valueOne], i) => {
      return isEqual({
        keyOne,
        keyTwo: objectTwoEntries[i][0],
        valueOne,
        valueTwo: objectTwoEntries[i][1]
      });
    });
  }
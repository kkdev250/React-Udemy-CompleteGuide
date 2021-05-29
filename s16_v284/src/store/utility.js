//utility function to help keep reducer more leaner:
export const updateObject = (oldObject, updatedValues) => { //updatedValues must be a js object
  return {
    ...oldObject,
    ...updatedValues
  }
}
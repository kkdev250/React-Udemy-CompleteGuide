export const updateObject = (oldObject, updatedProperties) => { //updatedProperties HAS TO be an object!
  return {
    ...oldObject,
    ...updatedProperties
  }
}
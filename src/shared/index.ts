export const extend = Object.assign

export const isObject = (raw) => {
  return raw !== null && typeof raw === 'object'
}
export const hasChange = (val, newVal) => {
  return !Object.is(val, newVal)
}

import {mutableHandler, readOnlyHandler, shallowReadOnlyHandler} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadOnly",
  IS_REF = "__v_isRef"
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandler)
}

export function readOnly(raw) {
  return createActiveObject(raw, readOnlyHandler)
}

export function shallowReadOnly(raw) {
  return createActiveObject(raw, shallowReadOnlyHandler)
}

export function isReactive(val) {
  return !!val[ReactiveFlags.IS_REACTIVE]
}

export function isReadOnly(val) {
  return !!val[ReactiveFlags.IS_READONLY]
}

export function isProxy(val) {
  return isReactive(val) || isReadOnly(val)
}


export function isRef(val) {
  return !!val[ReactiveFlags.IS_REF]
}

export function unRef(val) {
  return isRef(val) ? val.value : val
}

function createActiveObject(raw:any, baseHandler) {
  return new Proxy(raw, baseHandler);
}

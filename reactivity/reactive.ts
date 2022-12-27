import {mutableHandler, readOnlyHandler} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadOnly"
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandler)
}

export function readOnly(raw) {
  return createActiveObject(raw, readOnlyHandler)
}

export function isReactive(val) {
  return !!val[ReactiveFlags.IS_REACTIVE]
}

export function isReadOnly(val) {
  return !!val[ReactiveFlags.IS_READONLY]
}

function createActiveObject(raw:any, baseHandler) {
  return new Proxy(raw, baseHandler);
}

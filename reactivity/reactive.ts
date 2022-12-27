import {mutableHandler, readOnlyHandler} from "./baseHandlers";

export function reactive(raw) {
  return createActiveObject(raw, mutableHandler)
}

export function readOnly(raw) {
  return createActiveObject(raw, readOnlyHandler)
}

function createActiveObject(raw:any, baseHandler) {
  return new Proxy(raw, baseHandler);
}

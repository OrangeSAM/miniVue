import {track, trigger} from "./effect";
import {reactive, ReactiveFlags, readOnly} from "./reactive";
import {isObject} from "../shared";

const get = createGetter()
const set = createSetter()
const readOnlyGet = createGetter(true)

function createGetter(isReadOnly= false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadOnly
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadOnly
    }

    // todo 这里如何知道target就是包含age的对象呢
    const res = Reflect.get(target, key)
    if (!isReadOnly) {
      // 依赖收集
      track(target, key)
    }
    if (isObject(res)) {
      return isReadOnly ? readOnly(res) : reactive(res)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}

export const mutableHandler = {
  get,
  set
}
export const readOnlyHandler = {
  get: readOnlyGet,
  set: function (target: any, key: string, value: any, receiver: any): boolean {
    console.warn(`key: ${key}设置失败，因为${target}是readOnly。`)
    return true
  }
}

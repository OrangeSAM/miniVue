import { trigger } from "./effect";
import {track} from "./effect";

export function reactive(raw) {
  return new Proxy(raw, {
    get(target: any, key: string | symbol, receiver: any): any {
      // 这里如何知道target就是包含age的对象呢
      const res = Reflect.get(target, key)

      // 依赖收集
      track(target, key)
      return res
    },
    set(target: any, key: string | symbol, value: any, receiver: any): boolean {
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    }
  })
}

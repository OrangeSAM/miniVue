/**
 * Author：
 * Date: 22.11.29
 * Description:
 */
// 把值类型变成响应式，负责管理值类型的依赖，及通知值类型的依赖
export class Dep {
  constructor (val) {
    this._val = val
    this.effects = new Set()
  }

  get value () {
    this.depend()
    return this._val
  }

  set value (val) {
    this._val = val
    this.notice()
  }

  depend () {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
  }

  notice () {
    this.effects.forEach((effect) => {
      effect()
    })
  }
}

let currentEffect = null

export function samEffect (fn) {
  currentEffect = fn
  fn()
  currentEffect = null
}

const targetsMap = new Map()

// 大dep套小dep
// 大dep key为对象，小dep key 为属性名称
function getDep (raw, key) {
  let depsMap = targetsMap.get(raw)
  if (!depsMap) {
    depsMap = new Map()
    targetsMap.set(raw, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    // 对象中的属性，复用之前的依赖收集逻辑
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep;
}

export function reactive(raw){
  return new Proxy(raw, {
    get (target, key, receiver) {
      let dep = getDep(target, key);
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      let dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result
    }
  })
}

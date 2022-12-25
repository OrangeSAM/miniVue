class ReactiveEffect {
  private _fn: any;
  constructor(fn, public scheduler?) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}

const targetMap = new Map()

export function track(target, key) {
  // 整体结构如下
  // targetMap: {
  // [一个对象，比如target]: {
  //      [原对象中的key]: [依赖该key的函数构成的数组]
  //   }
  // }

  let depsMap = targetMap.get(target)
  // 想不明白，为什么这里depsMap第一次进来就直接有值了
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key,dep)
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

let activeEffect
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn,  options.scheduler)
  _effect.run()

  return _effect.run.bind(_effect)
}

import {extend} from "../shared";

let activeEffect:any =null
let shouldTrack
class ReactiveEffect {
  private _fn: any;
  deps = []
  public scheduler: Function | undefined
  private active: boolean = true
  onStop?: () => void
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    // 1. 会收集依赖
    // shouldTrack 来区分
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this

    const result = this._fn()
    // reset
    shouldTrack = false
    return result
  }
  stop() {
    if (this.active) {
      cleanUpEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

function cleanUpEffect(effect) {
  effect.deps.forEach((dep:any) => {
    dep.delete(effect)
  })
  // 优化
  effect.deps.length = 0
}

const targetMap = new Map()

export function track(target, key) {
  // 整体结构如下
  // targetMap: {
  // [一个对象，比如target]: {
  //      [原对象中的key]: [依赖该key的函数构成的数组]
  //   }
  // }
  // if (!activeEffect) return
  // if (!shouldTrack) return
  if (!isTracking()) return

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
  trackEffects(dep)
}

export function trackEffects(dep) {
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  // if (!activeEffect) return // 坑货，被stop feature影响到了
  activeEffect.deps.push(dep)
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  triggerEffects(dep);
}

export function triggerEffects(dep: any) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn,  options.scheduler)
  // _effect.onStop = options.onStop
  // Object.assign(_effect, options)// 优雅写法，拓展性强
  extend(_effect, options) // 抽离为公共函数，语义化

  _effect.run()

  const runner:any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

export function stop(runner) {
  runner.effect.stop()
}

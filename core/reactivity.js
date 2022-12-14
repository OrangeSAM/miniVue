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

// 用于收集依赖
// 想要函数中使用的东西后面更新后，自动更新相关的内容，就要用他
// 当执行传入的fn时，获取响应式数据的值时，这个函数就会被当做依赖而收集
// 所以下面，函数的执行得放在 `currentEffect = fn` 这一句的前面
// 这也是createApp文件中，mount函数里的这句得先执行，const setupResult = rootComponent.setup()，意在先产生响应式数据

export function samEffect (fn) {
  currentEffect = fn
  fn()
  currentEffect = null
}

const targetsMap = new Map()

// 用于处理对象类型的依赖收集
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
    // 对象的依赖收集最细粒度可以化解到之前的值类型依赖收集，即可复用之前的Dep类
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep;
}

export function reactive(raw){
  return new Proxy(raw, {
    get (target, key, receiver) {
      // getDep会返回一个Dep实例
      let dep = getDep(target, key);
      // 手机依赖
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      //  getDep会返回一个Dep实例
      let dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      // 通知依赖更新
      dep.notice()
      return result
    }
  })
}

/**
 * Author：
 * Date: 22.11.29
 * Description:
 */
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

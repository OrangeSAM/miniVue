/**
 * Author：
 * Date: 22.12.4
 * Description:
 */
export {Dep, samEffect, reactive} from './reactivity.js'

export function createApp (rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup()

      rootComponent.render(setupResult)
    }
  }
}

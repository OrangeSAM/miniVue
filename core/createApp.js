import {samEffect} from "./reactivity.js";

/**
 * Author：
 * Date: 22.12.7
 * Description:
 */
export function createApp (rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup()

      // render => samEffect
      // samEffect => render
      samEffect(() => {
        rootContainer.textContent = ''
        const element = rootComponent.render(setupResult)
        rootContainer.append(element)
      })
    }
  }
}

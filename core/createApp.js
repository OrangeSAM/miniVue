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
        const subTree = rootComponent.render(setupResult)
        console.log(subTree)
        // rootContainer.append(element)
      })
    }
  }
}

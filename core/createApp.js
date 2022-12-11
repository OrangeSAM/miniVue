import {samEffect} from "./reactivity.js";
import {mountElement} from "./renderer.js";

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
        mountElement(subTree, rootContainer)
        // rootContainer.append(element)
      })
    }
  }
}

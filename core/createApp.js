import {samEffect} from "./reactivity.js";
import {mountElement} from "./renderer.js";
import {diff} from "./renderer.js";

/**
 * Author：
 * Date: 22.12.7
 * Description:
 */
export function createApp (rootComponent) {
  return {
    // rootContainer 根容器
    mount(rootContainer) {
      // 这步理解为初始化数据？因为等下render函数中要用到
      // 因为你得先把数据变成响应式数据
      const setupResult = rootComponent.setup()
      let prevSubTree
      let isMounted = false

      // render => samEffect
      // samEffect => render
      // 上面两者效果是一样的
      samEffect(() => {
        // 第一次挂载，直接渲染
        if (!isMounted) {
          isMounted = true
          const subTree = rootComponent.render(setupResult)
          // 将虚拟节点逐一挂载到真实dom节点上
          mountElement(subTree, rootContainer)
        } else {
          // 挂载过，对比后更新
          const subTree = rootComponent.render(setupResult)
          // diff算法，只更新必须更新
          diff(prevSubTree, subTree)
          prevSubTree = subTree
        }
      })
    }
  }
}

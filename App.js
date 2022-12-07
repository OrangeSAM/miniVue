import {reactive, samEffect} from "./core";

/**
 * Author：
 * Date: 22.12.7
 * Description:
 */

export default {
  // template => render
  render (context) {
    const element = document.createElement('div')
    const text = document.createTextNode('这是一个响应式count计数： ')
    const text1 = document.createTextNode(context.obj.count)

    element.append(text)
    element.append(text1)
    return element
  },
  setup () {
    const obj = reactive({
      count: 1
    })
    window.obj = obj

    return {
      obj
    }
  }
}

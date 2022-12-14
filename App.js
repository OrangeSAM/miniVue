import {h, reactive} from "./core";

/**
 * Author：
 * Date: 22.12.7
 * Description:
 */

export default {
  // template => render
  render (context) {
    // const element = document.createElement('div')
    // const text = document.createTextNode('这是一个响应式count计数： ')
    // const text1 = document.createTextNode(context.obj.count)
    //
    // element.append(text)
    // element.append(text1)
    // return element

    // 虚拟dom第一步
    // return h('div', {id: 'sam', class: 'border'}, [
    //   h('p', {}, '这是一个响应式count计数'),
    //   h('p', {}, String(context.obj.count))
    // ])

    // diff测试用例
    // return h(context.obj.tag, {}, '1')
    // return h('div', context.obj.props, '1')
    return h('div', context.obj.props, '1')
  },
  setup () {
    const obj = reactive({
      count: 1,
      tag: 'div',
      props: {
        a: 'a',
        b: 'b'
      }
    })
    // 将响应式数据暴露到window上，方便调试
    window.obj = obj

    return {
      obj
    }
  }
}

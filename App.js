
/**
 * Author：
 * Date: 22.12.7
 * Description:
 */
// 竟然还能这样import
import {h, reactive} from "./core";
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

    // --------------------------------------------------------------------------------------

    // 虚拟dom第一步
    // return h('div', {id: 'sam', class: 'border'}, [
    //   h('p', {}, '这是一个响应式count计数'),
    //   h('p', {}, String(context.obj.count))
    // ])

    // diff测试用例
    // test diff tag
    // return h(context.obj.tag, {}, '1')

    // test props 1 add
    // return h('div', context.obj.props, '1')
    // test props 2 remove
    // return h('div', context.obj.props, '1')

    // test children new string - old string/array
    // return h('div', {}, context.obj.children)
    // test children new Array - old string
    // return h('div', {}, context.obj.children)
    // test children old Array new Array
    return h('div', {}, context.obj.children)
  },
  setup () {
    const obj = reactive({
      count: 1,
      tag: 'div',
      props: {
        a: 'a',
        b: 'b'
      },
      // children直接输入数字1，会有问题，因为mount的逻辑判断到
      children: [
        h('div', {}, '111'),
      ],
      childrenNew: [
        h('div', {}, 'aaa'),
        h('div', {}, 'bbb'),

      ]
    })
    // 将响应式数据暴露到window上，方便调试
    window.obj = obj

    return {
      obj
    }
  }
}

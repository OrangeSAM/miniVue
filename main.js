/**
 * Author：
 * Date: 22.12.4
 * Description:
 */
// 使用reactivity库
// 即便漏个.js后缀都会报错
// import {ref, effect} from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";
//
// const a = ref(10)
// let b = 0
//
// effect(() => {
//   b = a.value + 10
//   console.log(b)
// })
// a.value = 20

// ## 自己实现
import {Dep, samEffect, reactive} from "./core/index.js";

// 值类型的响应式
// const a = new Dep(10)
// let b = 0
//
// samEffect(() => {
//   b = a.value + 10
//   console.log(b)
// })
// a.value = 20

// 对象类型的响应式
// const user = reactive({
//   age: 10
// })
// let nextAge = 0
//
// samEffect(() => {
//   nextAge = user.age + 1
//   console.log(nextAge)
// })
// user.age++

// 有dom的响应式demo
// const context = reactive({
//   count: 0
// })
//
// window.context = context
//
// samEffect(() => {
//   // ui
// })

// todo 优化点
// 全量更新
// ui不够跨平台
import App from "./App.js";
// todo 1 不是很懂为什么都执行了createApp里的逻辑，这句还有必要存在
// 好像他注释掉了，后面可以分别跑下，有无注释的两种情况
// App.render(App.setup())

import {createApp} from "./core/index.js";

createApp(App).mount(document.querySelector('#app'))

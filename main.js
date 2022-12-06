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

// const a = new Dep(10)
// let b = 0
//
// samEffect(() => {
//   b = a.value + 10
//   console.log(b)
// })
// a.value = 20

const user = reactive({
  age: 10
})
let nextAge = 0

samEffect(() => {
  nextAge = user.age + 1
  console.log(nextAge)
})
user.age++

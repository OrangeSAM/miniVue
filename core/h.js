/**
 * Author：
 * Date: 22.12.11
 * Description:
 */
// createVnode
// 返回对于一个标签的对象化描述
export function h (tag, props, children) {
  return {
    tag, props, children
  }
}

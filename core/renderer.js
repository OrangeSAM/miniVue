/**
 * Author：
 * Date: 22.12.11
 * Description:
 */

// 自定义渲染器
function createElement(tag) {
  return document.createElement(tag)
}

function patchProps(el, key, prevVal, nextVal) {
  if (nextVal === null) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, nextVal)
  }
}

function insert(el, parent) {
  // 最后真正将虚拟dom挂载到页面的地方
  parent.append(el)
}

function createTextNode(text) {
  return document.createTextNode(text)
}

// vnode即需要渲染的虚拟dom
// container是挂载的节点
export function mountElement(vnode, container) {
  // tag
  const {tag, props, children } = vnode
  const el = (vnode.el = createElement(tag))

  // props = {}
  for(const key in props) {
    const val = props[key]
    patchProps(el, key, null, val)
  }


  // children
  // string array
  if (typeof children === 'string') {
    insert(createTextNode(children), el)
  } else if (Array.isArray(children)){
    children.forEach(v => {
      mountElement(v, el)
    })
  }

  // insert
  insert(el, container)
}

// v1 oldVnode
// v2 newVnode
export function diff(v1, v2) {
  // 1. tag
  if (v1.tag !== v2.tag) {
    v1.el.replaceWith(createElement(v2.tag))
  } else {
    // props
    // 1.
    // new {a,b}
    // old {a}
    // 新增b即可
    // new {a}
    // old {a,b}
    // 删除b即可

    const newProps = v2.props
    const oldProps = v1.props
    const el = (v2.el = v1.el)
    console.log(newProps, oldProps)

    if (newProps) {
      for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {

          patchProps(el, key, oldProps[key], newProps[key])
        }
      }
    }
    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null)
        }
      }
    }
  }
}

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
  el.setAttribute(key, nextVal)
}

function insert(el, parent) {
  parent.append(el)
}

function createTextNode(text) {
  return document.createTextNode(text)
}
export function mountElement(vnode, container) {
  // tag
  const {tag, props, children } = vnode
  const el = createElement(tag)

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

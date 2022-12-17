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

function remove(el, parent) {
  parent.remove(el)
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
  // string array，还有可能直接是数字
  if (typeof children === 'string' || typeof children === 'number') {
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

    // 3. children
    // new => string array
    // old => string array
    // 1. new string old string
    // 2. new string old array
    // 3. new array  old string
    // 4. new array  old array(暴力破解)

    const newChildren = v2.children
    const oldChildren = v1.children
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          el.innerText = newChildren
        }
      } else if (Array.isArray(oldChildren)) {
        el.innerText = newChildren
      }
    } else if(Array.isArray(newChildren)) {
      if (typeof  oldChildren === 'string') {
        el.innerText = ''
        newChildren.forEach(v => {
          mountElement(v, el)
        })
      } else if(Array.isArray(oldChildren)) {
        // 需要考虑的情况有
        // 1. 以此对比
        // new [1,2,3]
        // old [1,2,3]
        // 2. new > old add
        // new [1,2,3]
        // old [1,3]
        // 3. new < old remove
        // new [1,2]
        // old [1,2,3]

        const length = Math.min(oldChildren.length, newChildren.length)

        for (let i = 0; i < length; i++) {
          const newVnode = newChildren[i]
          const oldVnode = oldChildren[i]
          diff(oldVnode, newVnode)
        }

        // new > old add
        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            const vnode = newChildren[i]
            mountElement(vnode, el)
          }
        }

        // new < old remove
        if (oldChildren.length < length) {
          for (let i = length; i < oldChildren.length; i++) {
            const vnode = oldChildren[i]
            remove(vnode.el, el)
          }
        }
      }
    }
  }
}

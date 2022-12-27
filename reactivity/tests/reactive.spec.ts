import {isReactive, reactive} from "../reactive";

describe('reactive', () => {
  it('should reactive ok', function () {
    const original = {foo: 1}
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
    // 测试是否为响应式数据
    expect(isReactive(observed)).toBe(true)
    // 测试纯净对象是否为响应式数据
    expect(isReactive(original)).toBe(false)
  });

  it('should nested reactive workds', function () {
    const original = {
      nested: {
        foo: 1
      },
      array: [{bar: 2}]
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  });
})

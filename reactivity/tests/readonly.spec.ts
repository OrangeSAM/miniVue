import {isReadOnly, readOnly} from "../reactive";

describe('readonly', () => {
  it('should readonly works', function () {
    const original = {foo: 1, bar: {baz: 2}}
    const wrapped = readOnly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
    // 验证是否为readonly
    expect(isReadOnly(wrapped)).toBe(true)
    expect(isReadOnly(original)).toBe(false)
    expect(isReadOnly(wrapped.bar)).toBe(true)
    expect(isReadOnly(original.bar)).toBe(false)
  });

  it('should warning when set readonly', function () {
    console.warn = jest.fn()
    const user = readOnly({
      age: 10
    })
    user.age = 11
    expect(console.warn).toBeCalled()
  });
})

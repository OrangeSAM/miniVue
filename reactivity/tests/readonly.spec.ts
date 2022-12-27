import {readOnly} from "../reactive";

describe('readonly', () => {
  it('should readonly works', function () {
    const original = {foo: 1, bar: {baz: 2}}
    const wrapped = readOnly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
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

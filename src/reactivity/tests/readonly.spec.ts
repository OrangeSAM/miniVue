import { isReadonly, readonly, isProxy } from '../reactive';

describe('readonly', () => {
  it('happy path', () => {
    const origin = { foo: 1, bar: { baz: 2 }, arr: [{ zxd: 1 }] };
    const wrapper = readonly(origin);
    expect(wrapper).not.toBe(origin);
    expect(wrapper.foo).toBe(1);

    expect(isReadonly(wrapper)).toBe(true);
    expect(isReadonly(origin)).toBe(false);

    // 测试嵌套
    expect(isReadonly(wrapper.bar)).toBe(true);
    expect(isReadonly(wrapper.arr)).toBe(true);
    expect(isReadonly(origin.bar)).not.toBe(true);

    // isProxy
    expect(isProxy(wrapper)).toBe(true);
  });

  it('warn then call set', () => {
    console.warn = jest.fn();

    const user = readonly({
      age: 10
    });

    user.age = 11;

    expect(console.warn).toBeCalled();
  });
});

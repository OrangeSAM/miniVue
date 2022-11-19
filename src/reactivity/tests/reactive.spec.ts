import { reactive, isReactive, isProxy } from '../reactive';
describe('reactive', () => {
  it('happy path', () => {
    const origin = { foo: 1 };
    const observed = reactive(origin);
    expect(origin).not.toBe(observed);
    expect(observed.foo).toBe(1);

    expect(isReactive(observed)).toBe(true);
    expect(isReactive(origin)).toBe(false);

    // isProxy
    expect(isProxy(observed)).toBe(true);
  });

  it('nested reactive', () => {
    const origin = reactive({
      obj: {
        foo: 1
      },
      arr: [{ bar: 2 }]
    });

    const observed = reactive(origin);
    expect(isReactive(observed.obj)).toBe(true);
    expect(isReactive(observed.arr)).toBe(true);
    expect(isReactive(observed.arr[0])).toBe(true);
  });
});

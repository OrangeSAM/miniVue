import { isReadonly, shallowReadonly } from '../reactive';

describe('shallowReadonly', () => {
  it('happy path ', () => {
    const origin = shallowReadonly({
      bar: {
        foo: 1
      }
    });

    expect(isReadonly(origin)).toBe(true);
    expect(isReadonly(origin.bar)).toBe(false);
  });

  it('warn then call set', () => {
    console.warn = jest.fn();

    const user = shallowReadonly({
      age: 10
    });

    user.age = 11;

    expect(console.warn).toBeCalled();
  });
});

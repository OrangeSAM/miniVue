import { reactive } from '../reactive';
import { effect, stop } from '../effect';
describe('effect', () => {
  it('happy path', () => {
    // create
    const user = reactive({
      age: 18
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(19);

    // update

    user.age++;
    expect(nextAge).toBe(20);
  });

  it('should return runner when call effect', () => {
    // effect(fn) ->function runner -> 再次执行 runner的时候， fn也会再次执行
    let foo = 10;

    const runner = effect(() => {
      foo++;
      return 'foo';
    });
    expect(foo).toBe(11);
    const res = runner();
    expect(res).toBe('foo');
    expect(foo).toBe(12);
  });

  it('scheduler ', () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);

    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);

    run();
    expect(dummy).toBe(2);
  });

  it('stop', () => {
    let dummy;
    const obj = reactive({ foo: 1 });
    const runner = effect(() => {
      dummy = obj.foo;
    });

    obj.foo = 2;
    expect(dummy).toBe(2);
    stop(runner);

    obj.foo++;
    expect(dummy).toBe(2);

    runner();
    expect(dummy).toBe(3);
  });

  it('onStop', () => {
    const obj = reactive({ foo: 1 });
    const onStop = jest.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { onStop }
    );

    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});

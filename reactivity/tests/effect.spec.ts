import {reactive} from "../reactive";
import {effect} from "../effect";

describe("effect", () => {
  it('should effect work', function () {
    const user = reactive({
      age: 10
    })
    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)


    user.age++
    expect(nextAge).toBe(12)
  });

  it('show return effect when effect called', function() {
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'foo'
    })

    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })

  it('should scheduler works', function () {
    // 1. 通过effect的第二个参数给定一个名为scheduler的fn
    // 2. effect 第一次执行的时候，还会执行第一个参数fn
    // 3. 当响应式对象set update，不会执行第一个参数fn，而是执行scheduler
    // 4. 如果说当执行runner的时候，会再次的执行fn
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({foo: 1})
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler}
    )
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    // 手动执行
    run()
    expect(dummy).toBe(2)
  });
})

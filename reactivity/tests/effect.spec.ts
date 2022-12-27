import {reactive} from "../reactive";
import {effect, stop} from "../effect";
import {run} from "jest";

describe("effect", () => {
  it('should effect works', function () {
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

  it('should stop works', function () {
    let dummy
    const obj = reactive({prop: 1})
    const runner = effect(() => {
      dummy = obj.prop
    })
    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    // obj.prop = 3
    obj.prop++ // ++ 操作会涉及到get（会触发一个收集依赖的操作，导致stop清空的依赖又加回去了）和set两个操作
    expect(dummy).toBe(2)

    // stopped effect should still be manually callable
    runner()
    expect(dummy).toBe(3)
  });

  it('should onstop works', function () {
    const obj = reactive({
      foo: 1
    })
    const onStop = jest.fn()
    let dummy
    const runner = effect(
  () => {
        dummy = obj.foo
      },
      {
        onStop
      }
    )
    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  });
})

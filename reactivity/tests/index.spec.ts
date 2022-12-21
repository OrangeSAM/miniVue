import {add} from '../index'
it('should init ok', function () {
  expect(add(1, 1)).toBe(2)
});

// jest 运行的环境是node.js，而node.js默认使用commonjs规范

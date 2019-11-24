const _1 = require('./_1');
const _2 = require('./_2');
const chainalize = require('../../src');

it('should throw an error if circular dependency direct', () => {
  expect(() => chainalize({
    first: [_1, _2],
    second: [_2, _1],
  })).toThrow(
    'chainalize: circular dependency found [first - second - first];'
    + ' full initialization sequence: first > second > first'
  );
});

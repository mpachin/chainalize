const _1 = require('./_1');
const _2 = require('./_2');
const _3 = require('./_3');
const _4 = require('./_4');
const chainalize = require('../../src');

it('should throw an error if circular dependency indirect', () => {
  expect(() => chainalize({
    first: [_1, _2],
    second: [_2, _3],
    third: [_3, _4],
    fourth: [_4, _1],
  })).toThrow(
    'chainalize: circular dependency found [first - fourth - first];'
    + ' full initialization sequence: first > second > third > fourth > first'
  );
});

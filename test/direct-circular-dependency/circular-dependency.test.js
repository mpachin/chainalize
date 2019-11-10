const _1 = require('./_1');
const chainalize = require('../../src');

const classes = {
  _1,
};

it('should throw an error if circular dependency direct', () => {
  expect(() => chainalize(classes)).toThrow(
    'chainalize: circular dependency found [_1 - _2]; ' +
    'full initialization sequence: _1 > _2 > _1'
  );
});

const _1 = require('./_1');
const _2 = require('./_2');
const _3 = require('./_3');
const _4 = require('./_4');
const _5 = require('./_5');
const _6 = require('./_6');
const _7 = require('./_7');
const _8 = require('./_8');
const chainalize = require('../../src');

describe('chaining with one input link class', () => {
  const chain = chainalize({
    first: [_1, _2, 'first local arg'],
    second: [_2, _3, _4],
    third: [_3, new _5(), new _6()],
    fourth: [_4],
    seventh: [_7, 'seventh local arg', _2],
    eighth: [_8, _3, 'eighth local arg', _4],
  });

  it('instances should have access to subsequent instances', () => {
    expect(chain.first.getChain()).toBe('_1_2_3_5_6_4 first local arg');
    expect(chain.second.getChain()).toBe('_2_3_5_6_4');
    expect(chain.third.getChain()).toBe('_3_5_6');
    expect(chain.fourth.getChain()).toBe('_4');
    expect(chain.seventh.getChain()).toBe('_7_2_3_5_6_4 seventh local arg');
    expect(chain.eighth.getChain()).toBe('_8_3_5_6_4 eighth local arg');
  });
});

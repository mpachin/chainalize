const _1 = require('./_1');
const _7 = require('./_7');
const _8 = require('./_8');
const chainalize = require('../../src');

describe('chaining with one input link class', () => {
  const classes = {
    _1,
  };

  const chain = chainalize(classes);

  it('instances should have access to subsequent instances', () => {
    expect(chain._1.getChain()).toBe('_1_2_3_5_6_4');
    expect(chain._2.getChain()).toBe('_2_3_5_6_4');
    expect(chain._3.getChain()).toBe('_3_5_6');
    expect(chain._4.getChain()).toBe('_4');
    expect(chain._5.getChain()).toBe('_5');
    expect(chain._6.getChain()).toBe('_6');
  });

  it('classes outside of input hierarchy are undefined', () => {
    expect(chain._7).toBe(undefined);
    expect(chain._8).toBe(undefined);
  });
});

describe('chaining with multiple input link classes', () => {
  const classes = {
    _1,
    _7,
    _8,
  };

  const chain = chainalize(
    classes,
    {
      testArgument: 'testArgument',
      _1: 'first test argument',
      _7: 'second test argument',
    },
  );

  it('classes inside of input hierarchy are defined ' +
    'and should have access to subsequent instances', () => {
    expect(chain._7.getChain()).toBe('_7_2_3_5_6_4');
    expect(chain._8.getChain()).toBe('_8_3_5_6_4 # testArgument');
  });

  it('classes should get their local arguments', () => {
    expect(chain._1.getArg()).toBe('first test argument');
    expect(chain._7.getArg()).toBe('second test argument');
  });
});

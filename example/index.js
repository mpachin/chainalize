const _1 = require('./_1');
const _2 = require('./_2');
const chainalize = require('../src');

const classes = {
  _1,
  _2
};

const chain = chainalize(classes);

chain._1.log(); // '_1_2'
chain._2.log(); // '_2'
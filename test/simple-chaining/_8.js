const _3 = require('./_3');
const _4 = require('./_4');

class _8 {
  constructor({ _3, _4, testArgument }) {
    this._3 = _3;
    this._4 = _4;
    this.testArgument = testArgument;
  }

  getChain() {
    return `_8${this._3.getChain()}${this._4.getChain()} # ${this.testArgument}`;
  }
}
_8.dependencies = {
  _3,
  _4
};

module.exports = _8;

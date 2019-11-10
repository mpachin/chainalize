const _3 = require('./_3');
const _4 = require('./_4');

class _2 {
  constructor({ _3, _4 }) {
    this._3 = _3;
    this._4 = _4;
  }

  getChain() {
    return `_2${this._3.getChain()}${this._4.getChain()}`;
  }
}
_2.dependencies = {
  _3,
  _4,
};

module.exports = _2;

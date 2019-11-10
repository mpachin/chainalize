const _3 = require('./_3');

class _2 {
  constructor({ _3 }) {
    this._3 = _3;
  }

  getChain() {
    return `_1${this._3.getChain()}`;
  }
}
_2.dependencies = {
  _3,
};

module.exports = _2;

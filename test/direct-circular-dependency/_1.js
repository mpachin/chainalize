const _2 = require('./_2');

class _1 {
  constructor({ _2 }) {
    this._2 = _2;
  }

  getChain() {
    return `_1${this._2.getChain()}`;
  }
}
_1.dependencies = {
  _2,
};

module.exports = _1;

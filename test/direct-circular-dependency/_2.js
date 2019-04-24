const _1 = require('./_1');

class _2 {
  constructor({ _1 }) {
    this._1 = _1;
  }

  getChain() {
    return `_1${this._1.getChain()}`;
  }
}
_2.dependencies = {
  _1
};

module.exports = _2;

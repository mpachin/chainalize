const _2 = require('./_2');

class _1 {
  constructor({ _2, _1LocalArg }) {
    this._2 = _2;
    this._1LocalArg = _1LocalArg;
  }

  getArg() {
    return this._1LocalArg;
  }

  getChain() {
    return `_1${this._2.getChain()}`;
  }
}
_1.dependencies = {
  _2,
};

module.exports = _1;

const _2 = require('./_2');

class _7 {
  constructor({ _2, _7LocalArg }) {
    this._2 = _2;
    this._7LocalArg = _7LocalArg;
  }

  getArg() {
    return this._7LocalArg;
  }

  getChain() {
    return `_7${this._2.getChain()}`;
  }
}
_7.dependencies = {
  _2,
};

module.exports = _7;

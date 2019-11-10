const _5 = require('./_5');
const _6 = require('./_6');

class _3 {
  constructor({ _5, _6 }) {
    this._5 = _5;
    this._6 = _6;
  }

  getChain() {
    return `_3${this._5.getChain()}${this._6.getChain()}`;
  }
}
_3.dependencies = {
  _5,
  _6,
};

module.exports = _3;

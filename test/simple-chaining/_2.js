class _2 {
  constructor(_3, _4) {
    this._3 = _3;
    this._4 = _4;
  }

  getChain() {
    return `_2${this._3.getChain()}${this._4.getChain()}`;
  }
}

module.exports = _2;

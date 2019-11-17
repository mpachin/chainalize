class _3 {
  constructor(_5, _6) {
    this._5 = _5;
    this._6 = _6;
  }

  getChain() {
    return `_3${this._5.getChain()}${this._6.getChain()}`;
  }
}

module.exports = _3;

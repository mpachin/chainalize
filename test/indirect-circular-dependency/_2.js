class _2 {
  constructor(_3) {
    this._3 = _3;
  }

  getChain() {
    return `_1${this._3.getChain()}`;
  }
}

module.exports = _2;

class _8 {
  constructor(_3, localArgument, _4) {
    this._3 = _3;
    this._4 = _4;
    this.localArgument = localArgument;
  }

  getChain() {
    return `_8${this._3.getChain()}${this._4.getChain()} ${this.localArgument}`;
  }
}

module.exports = _8;

class _7 {
  constructor(localArg, _2) {
    this._2 = _2;
    this.localArg = localArg;
  }

  getChain() {
    return `_7${this._2.getChain()} ${this.localArg}`;
  }
}

module.exports = _7;

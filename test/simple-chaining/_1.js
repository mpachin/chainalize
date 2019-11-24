class _1 {
  constructor(_2, localArg) {
    this._2 = _2;
    this.localArg = localArg;
  }

  getChain() {
    return `_1${this._2.getChain()} ${this.localArg}`;
  }
}

module.exports = _1;

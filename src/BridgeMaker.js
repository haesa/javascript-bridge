const BridgeMaker = {
  makeBridge(size, generateRandomNumber) {
    return new Array(size)
      .fill(0)
      .map((element) => (generateRandomNumber() ? 'U' : 'D'));
  },
};

module.exports = BridgeMaker;

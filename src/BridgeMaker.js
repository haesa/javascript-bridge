const BridgeMaker = {
  makeBridge(size, generateRandomNumber) {
    const result = [];

    for (let i = 0; i < size; i++) {
      const number = generateRandomNumber();
      result.push(number ? 'U' : 'D');
    }

    return result;
  },
};

module.exports = BridgeMaker;

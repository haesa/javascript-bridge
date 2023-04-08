const { Console } = require('@woowacourse/mission-utils');
const OutputView = require('./OutputView');

class BridgeGame {
  #bridge;
  #totalPlay;
  #index;
  #map;
  #isSuccess;
  constructor(bridge) {
    this.init();
    this.#bridge = bridge;
    this.#totalPlay = 1;
    this.#isSuccess = false;
  }

  get isEnd() {
    return this.#index === this.#bridge.length;
  }

  get index() {
    return this.#index;
  }

  get map() {
    return this.#map;
  }

  get isSuccess() {
    return this.#isSuccess;
  }

  get totalPlay() {
    return this.#totalPlay;
  }

  init() {
    this.#index = 0;
    this.#map = [[], []];
  }

  compare(answer) {
    if (answer === 'U' && this.#bridge[this.#index] === 'U') {
      return ['O', ' ', true];
    }

    if (answer === 'U' && this.#bridge[this.#index] === 'D') {
      return ['X', ' ', false];
    }

    if (answer === 'D' && this.#bridge[this.#index] === 'U') {
      return [' ', 'X', false];
    }

    if (answer === 'D' && this.#bridge[this.#index] === 'D') {
      return [' ', 'O', true];
    }
  }

  move(answer) {
    const [upCheck, downCheck, compare] = this.compare(answer);
    const [up, down] = this.#map;

    up.push(upCheck);
    down.push(downCheck);
    OutputView.printMap([up, down]);

    this.#index += 1;
    this.#isSuccess = this.isEnd && compare;

    return compare;
  }

  retry() {
    this.#totalPlay += 1;
    this.init();
  }

  end() {
    OutputView.printResult(this);
    Console.close();
  }
}

module.exports = BridgeGame;

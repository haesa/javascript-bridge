const { Console } = require('@woowacourse/mission-utils');
const { GAME_MESSAGE } = require('../constants/Constants');
const OutputView = require('./OutputView');
const InputView = require('./InputView');

class BridgeGame {
  #index;
  #map;
  #bridge;
  #totalPlay;
  #result;
  constructor(bridge) {
    this.init();
    this.#bridge = bridge;
    this.#totalPlay = 1;
    this.#result = false;
  }

  get isEnd() {
    return this.#index === this.#bridge.length;
  }

  get map() {
    return this.#map;
  }

  get totalPlay() {
    return this.#totalPlay;
  }

  get result() {
    return this.#result;
  }

  set bridge(bridge) {
    this.#bridge = bridge;
  }

  start() {
    Console.print(GAME_MESSAGE.START);
    InputView.readBridgeSize(this);
  }

  init() {
    this.#index = 0;
    this.#map = [[], []];
  }

  move(answer) {
    const [upCheck, downCheck, compare] = this.compare(answer);
    const [up, down] = this.#map;

    up.push(upCheck);
    down.push(downCheck);
    OutputView.printMap([up, down]);

    this.#index += 1;
    this.#result = this.isEnd && compare;

    return compare;
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

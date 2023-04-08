const { Console } = require('@woowacourse/mission-utils');
const { GAME_MESSAGE } = require('../constants/Constants');
const BridgeGame = require('./BridgeGame');

class App {
  #game;
  constructor() {
    this.#game = new BridgeGame();
  }
  play() {
    Console.print(GAME_MESSAGE.START);
    this.#game.start();
  }
}
const app = new App();
app.play();
module.exports = App;

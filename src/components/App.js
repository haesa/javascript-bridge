const BridgeGame = require('./BridgeGame');

class App {
  #game;
  constructor() {
    this.#game = new BridgeGame();
  }
  play() {
    this.#game.start();
  }
}
const app = new App();
app.play();
module.exports = App;

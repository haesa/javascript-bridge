const { Console } = require('@woowacourse/mission-utils');
const { GAME_MESSAGE } = require('./Constants');
const { generate } = require('./BridgeRandomNumberGenerator');
const { makeBridge } = require('./BridgeMaker');
const BridgeGame = require('./BridgeGame');
const Validation = require('./Validation');

const InputView = {
  readBridgeSize() {
    Console.readLine(GAME_MESSAGE.LENGTH, bridgeSize);
  },
  readMoving(game) {
    Console.readLine(GAME_MESSAGE.MOVING, (answer) =>
      crossBridge(answer, game)
    );
  },
  readGameCommand(game) {
    Console.readLine(GAME_MESSAGE.RESTART, (answer) => command(answer, game));
  },
};

function bridgeSize(answer) {
  try {
    Validation.bridgeSize(answer);
    const bridge = makeBridge(Number(answer), generate);

    Console.print('');
    InputView.readMoving(new BridgeGame(bridge));
  } catch (e) {
    Console.print(e.message);
    InputView.readBridgeSize();
  }
}

function crossBridge(answer, game) {
  try {
    Validation.moving(answer);

    if (game.move(answer) === false) {
      InputView.readGameCommand(game);
      return;
    }
    if (game.isEnd === false) {
      InputView.readMoving(game);
      return;
    }
    game.end();
  } catch (e) {
    Console.print(e.message);
    InputView.readMoving(game);
  }
}

function command(answer) {
  try {
    Validation.gameCommand(answer);
    if (answer === 'R') {
      game.retry();
      InputView.readMoving(game);
      return;
    }

    game.end();
  } catch (e) {
    Console.print(e.message);
    InputView.readGameCommand(game);
  }
}
module.exports = InputView;

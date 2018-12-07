class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.gameBoard = new GameBoard();
    this.playersNames = new PlayersNames();


    this.addEvents({
      'click .abortGameButton': 'restartGame',
      'click .startGameButton': 'getPlayers'
    });

  }

  unmount() {
    this.gameBoard.active = false;
    this.playersOptions.active = true;
  }

  getPlayers() {
    if (this.playersOptions.getPlayers()) {
      this.gameBoard.createGrid();
      this.playersNames.players = this.playersOptions.players;
      this.render();
      this.currentPlayer = this.whoIsCurrent(this.playersNames.players);
      console.log(this.currentPlayer.name);
    }
  }

  restartGame() {
    this.playersOptions.active = true;
    this.gameBoard.active = false;
    this.render();
  }

  whoIsCurrent(players) {
    let current;
    for (let i = 0; i < players.length; i++) {
      if (players[i].currentPlayer) {
        current = players[i];
      }
    }
    return current;
  }
}
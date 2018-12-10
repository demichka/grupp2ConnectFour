class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.gameBoard = new GameBoard();
    this.playersNames = new PlayersNames();


    this.addEvents({
      'click .abortGameButton': 'restartGame',
      'click .startGameButton': 'getPlayers',
      'click .column': 'changePlayer'
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
      this.gameBoard.currentPlayer = this.whoIsCurrent(this.playersNames.players);
      console.log(this.gameBoard.currentPlayer.color);
      this.render();
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
      if (players[i].myTurn) {
        current = players[i];
      }
    }
    console.log(current);
    return current;
  }



  changePlayer() {
    for (let i = 0; i < this.playersNames.players.length; i++) {
      this.playersNames.players[i].myTurn = !this.playersNames.players[i].myTurn;
      this.gameBoard.currentPlayer = this.whoIsCurrent(this.playersNames.players);
    }
    this.render();
  }
}
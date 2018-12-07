class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.gameBoard = new GameBoard();
    this.playersNames = new PlayersNames();

    this.addEvents({
      // 'click .startGameButton': 'createGrid',
      'click .abortGameButton': 'restartGame',
      'click .startGameButton': 'getPlayers'
    });

  }


  getPlayers() {
    if (this.playersOptions.getPlayers()) {
      this.gameBoard.createGrid();
      this.playersNames.players = this.playersOptions.players;
      this.render();
    }
  }

  restartGame() {
    this.playersOptions.active = true;
    this.gameBoard.active = false;
    this.render();
  }
}
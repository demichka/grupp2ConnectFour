class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.gameBoard = new GameBoard(this);


    this.addEvents({
      'click .abortGameButton': 'restartGame',
      'click .startGameButton': 'getPlayers', 
      'click .restartButton': 'restartGame' 
    });

  }

  unmount() {
    this.gameBoard.active = false;
    this.playersOptions.active = true;
  }

  getPlayers() {
    if (this.playersOptions.getPlayers()) {
      this.gameBoard.createGrid();
      this.gameBoard.playersNames.players = this.playersOptions.players;
      this.gameBoard.currentPlayer = this.gameBoard.whoIsCurrent(this.gameBoard.playersNames.players);
      this.render();
    }
  }

  restartGame() {
    this.playersOptions.active = true;
    this.gameBoard.active = false;
    this.render();
  }





}
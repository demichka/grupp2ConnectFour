class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.gameBoard = new GameBoard(this);
    this.modal = new Modal(this);
    this.tiedModal = new TiedModal(this);



    this.addEvents({
      'click .abortGameButton': 'restartGame',
      'click .startGameButton': 'startGame',
      'click .restartButton': 'restartGame' 
    });

  }

  unmount() {
    this.gameBoard.active = false;
    this.playersOptions.active = true;
  }

  startGame() {
    if (this.playersOptions.getPlayers()) {
      this.gameBoard.createGrid();
      this.gameBoard.playersNames.players = this.playersOptions.players;
      this.gameBoard.currentPlayer = this.gameBoard.whoIsCurrent(this.gameBoard.playersNames.players);
      this.gameBoard.botMakeMove();
      this.render();
    }
  }


  restartGame() {
    this.playersOptions.active = true;
    this.gameBoard.active = false;
    this.render();
  }





}
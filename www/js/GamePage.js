class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.gameBoard = new GameBoard(this);
    this.modal = new Modal(this);
    this.restartBtn = new RestartBtn(this);



    this.addEvents({
      'click .abortGameButton': 'abortGame',
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
      this.gameBoard.active = true;
      this.gameBoard.botMakeMove();
      this.render();
    }
  }

  resetCurrentPlayer() {
    if (this.gameBoard.playersNames.players.length > 0) {
      let players = this.gameBoard.playersNames.players;
      console.log(players);
      for (let i = 0; i < players.length; i++) {
        if (players[i].color === 'red') {
          players[i].myTurn = true;
        } else {
          players[i].myTurn = false;
        }
      }
    } else {
      return;
    }
  }

  restartGame() {
    this.gameBoard.active = false;
    console.log(this.gameBoard.active);
    this.resetCurrentPlayer();
    this.gameBoard.resetGrid();
    this.gameBoard.currentPlayer = this.gameBoard.whoIsCurrent(this.gameBoard.playersNames.players);
    this.gameBoard.active = true;
    console.log(this.gameBoard.active);
    this.gameBoard.botMakeMove();
    this.render();
  }


  abortGame() {
    this.playersOptions.active = true;
    this.gameBoard.active = false;
    this.render();
  }





}
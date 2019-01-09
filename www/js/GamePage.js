class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.savedSession = new PlayersNames();
    this.gameBoard = new GameBoard(this);
    this.currentPlayer = '';
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
  mount() {
    this.gameBoard.clickEnabled = true;
    this.gameBoard.gameOver = false;
    this.gameBoard.newHighscore = false;
  }


  startGame() {
    if (this.playersOptions.getPlayers()) {
      this.gameBoard.createGrid();
      this.savedSession.players = this.playersOptions.players;
      this.gameBoard.players = this.savedSession.players;
      this.currentPlayer = this.whoIsCurrent(this.gameBoard.players);
      this.gameBoard.active = true;
      this.volume = this.gameBoard.toggleAudioBtn.on;
      this.gameBoard.movesCount = 0;
      this.gameBoard.botMakeMove();
      this.gameBoard.gameStartTime = performance.now();
      this.render();
    }
  }

  resetCurrentPlayer(players) {
    if (players.length > 0) {
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

  whoIsCurrent(players) {
    return players.find((player) => {
      return player.myTurn;
    });
  }


  restartGame() {
    this.gameBoard.active = false;
    this.gameBoard = new GameBoard(this);
    this.modal = new Modal(this);
    this.gameBoard.createGrid();
    this.gameBoard.gameStartTime = performance.now();
    this.gameBoard.players = this.savedSession.players;
    for (let i = 0; i < this.gameBoard.players.length; i++) {
      let player = this.gameBoard.players[i];
      player.score = 0;
      player.winner = false;
    }
    this.resetCurrentPlayer(this.gameBoard.players);
    this.currentPlayer = this.whoIsCurrent(this.gameBoard.players);
    this.gameBoard.active = true;
    if (!this.volume) {
      this.gameBoard.toggleAudioBtn.on = false;
      this.gameBoard.toggleAudioBtn.audio.volume = 0;
    }
    this.gameBoard.movesCount = 0;
    this.gameBoard.botMakeMove();
    this.render();
  }


  abortGame() {
    this.gameBoard.active = false;
    this.playersOptions.active = true;
    this.savedSession.players.length = 0;
    this.gameBoard.gameOver = false;
    this.render();
  }
}
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


  launchGame() {
    if (this.playersOptions.getPlayers()) {
      this.gameBoard.createGrid();
      this.savedSession.players = this.playersOptions.players;
      console.log(this.savedSession.players, 'on start');
      this.gameBoard.players = this.savedSession.players;
      console.log(this.savedSession.players);
      this.currentPlayer = this.whoIsCurrent(this.gameBoard.players);
      this.gameBoard.active = true;
    }
  }

  startGame() {
      this.launchGame();
      this.savePlayers();
      this.gameBoard.botMakeMove();
      this.render();
      console.log(this.savedSession.players);
  }

  resetCurrentPlayer() {
    let players = this.gameBoard.players;
    if (players.length > 0) {
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
  
  whoIsCurrent(players) {
    return players.find((player) => {
        return player.myTurn;
    });
}

savePlayers() {
  JSON._save('savedPlayers.json', this.savedSession.players).then(function(){
    console.log('Saved!');
  });
}

  restartGame() {
    this.gameBoard.active = false;
    console.log(this.gameBoard.active);
    console.log(this.saveSession.players, 'saved');
    this.gameBoard.players = this.savedSession.players;
    console.log(this.gameBoard.players, 'reset');
    // this.resetCurrentPlayer();
    this.gameBoard = new GameBoard(this);
    this.gameBoard.createGrid();
    this.currentPlayer = this.whoIsCurrent(this.gameBoard.players);
    this.gameBoard.active = true;
    console.log(this.gameBoard.active);
    this.gameBoard.botMakeMove();
    this.render();
  }


  abortGame() {
    this.gameBoard.active = false;
    this.playersOptions.active = true;
    this.savedSession.players.length = 0;
    console.log(this.saveSession.players);
    this.render();
    console.log('inputs rendered');
  }





}
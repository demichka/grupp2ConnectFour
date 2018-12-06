class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.playersOptions = new PlayersOptions();
    this.gameBoard = new GameBoard();

    this.addEvents({
      // 'click .startGameButton': 'createGrid',
      'click .abortGameButton': 'restartGame',
      'click .startGameButton': 'getPlayers'      
    });
    this.restartGame();

    $('.abortGameButton').hide();
    $('.startGameButton').show();
    $('.game-board').hide();
  }


  getPlayers() {
    if (this.playersOptions.getPlayers()) {
      this.gameBoard.createGrid();
      $('.nameInput').hide();
      this.render();
    }
  }
  
  restartGame(){
    $('.game-board').hide();  
    $('.nameInput').show();
    $('.abortGameButton').hide();
    $('.startGameButton').show();
}
}
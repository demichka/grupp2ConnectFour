class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.slots = [];
    this.playerOptionPage = new PlayerOptionPage();

    this.addEvents({
      // 'click .startGameButton': 'createGrid',
      'click .abortGameButton': 'restartGame',
      'click .startGameButton': 'getPlayers'      
    });
    this.createGrid();
    this.restartGame();

    $('.abortGameButton').hide();
    $('.nameInput').show();
    $('.startGameButton').show();
    $('.game-board').hide();
  }


  getPlayers() {
    if (this.playerOptionPage.getPlayers()) {
      this.createGrid();
    }
  }
  createGrid() {
    $('.nameInput').hide();
    $('.abortGameButton').show();
    $('.startGameButton').hide();
    
    $('.game-board').show();  
    // this.playersOptionPage.getPlayers();
    for (let row = 0; row < 6; row++){
        for (let col = 0; col < 7; col++) {
          this.slots.push(new Slots (row, col));
        }
    }
  }
  restartGame(){
    $('.game-board').hide();  
    $('.nameInput').show();
    $('.abortGameButton').hide();
    $('.startGameButton').show();
    }
}






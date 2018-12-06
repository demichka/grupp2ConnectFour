class GamePage extends Component {
  constructor(selector) {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.markers = [];
    this.selector = selector;

    this.addEvents({
      'click .startGameButton': 'createGrid',
      'click .abortGameButton': 'restartGame'
    });
    this.createGrid();
    this.restartGame();

    $('.abortGameButton').hide();
    $('.nameInput').show();
    $('.startGameButton').show();
    $('#connect4').hide();
  }

  createGrid() {
    $('.nameInput').hide();
    $('.abortGameButton').show();
    $('.startGameButton').hide();
    
    $('#connect4').show();  
    // this.playersOptionPage.getPlayers();
    for (let row = 0; row < 6; row++){
        for (let col = 0; col < 7; col++) {
          this.markers.push(new Marker (row, col));
        }
    }
  }
  restartGame(){
    $('#connect4').hide();  
    $('.nameInput').show();
    $('.abortGameButton').hide();
    $('.startGameButton').show();
    }
}





// Draw a grid
//const connect4 = new GamePage('#connect4')
$(document).ready(function () {
  // const connect4 = new connect4('#connect4')
  const connect4 = new GamePage('#connect4')
});
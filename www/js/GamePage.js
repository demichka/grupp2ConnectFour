class GamePage extends Component {
  constructor(selector) {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
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
    $('#connect4').hide();
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
    
    $('#connect4').show();  
    const $board = $(this.selector);
    //   console.log($board);
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $('<div>')
        .addClass('row no-gutters');

      for (let col = 0; col < this.COLS; col++) {
        const $col = $('<div>')
          .addClass('col empty');
        $row.append($col);
      }
      $board.append($row);
    }
    // console.log($board.html());
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
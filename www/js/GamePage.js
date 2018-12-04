class GamePage extends Component {
  constructor(selector) {
    super();
    this.addRoute('/our-game', 'Vårt spel');
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;

    this.addEvents({
      'click .startGameButton': 'createGrid',
    });
    // this.createGrid();
  }

  createGrid() {
    this.playersOptionPage.getPlayers();
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
}





// Draw a grid
//const connect4 = new GamePage('#connect4')
$(document).ready(function () {
  // const connect4 = new connect4('#connect4')
  const connect4 = new GamePage('#connect4')
});
class PlayerOptionPage extends Component {
  constructor() {
    super();
    this.players = [];
    this.addEvents({
      'click .startGameButton': 'getPlayers'
    });
  }

  getPlayers() {
    $('.badge').remove();

    let p = '';
    let nameOne = $('#nameFirstPlayer').val();
    let typeOne = $('#typeFirstPlayer');
    let nameTwo = $('#nameSecondPlayer').val();
    let typeTwo = $('#typeSecondPlayer');
    this.players.length = 0;
    let validateType = (player) => { return player !== 'fake' ? true : false;};
    let validateName = (name) => {return name.length > 2 && name.length <= 10 ? true : false;};

    if( validateName(nameOne) &&
        validateName(nameTwo) &&
        validateType(typeOne.val()) &&
        validateType(typeTwo.val())
      ) {

        $('.badge').remove();
        let playerOne = new Player(nameOne);
        let playerTwo = new Player(nameTwo);
        playerOne.human = true ? typeOne.val() === 'human' : false;
        playerTwo.human = true ? typeTwo.val() === 'human' : false;
        this.players.push(playerOne, playerTwo);
      }
    else {
      if(!validateName(nameOne)) {
        p = $('<span class="badge badge-danger">Namn måste innehålla mer än 2 och mindre 10 symboler</span>');
        p.insertAfter(typeOne.parents('.input-group'));
      }
      if(!validateName(nameTwo)) {
        p = $('<span class="badge badge-danger">Namn måste innehålla mer än 2 och mindre 10 symboler</span>');
        p.insertAfter(typeTwo.parents('.input-group'));
      }
      if (!validateType(typeOne.val())) {
        p = $('<span class="badge badge-danger">Välj typ!</span>');
        p.insertAfter(typeOne);
      } 
      if (!validateType(typeTwo.val())) {
        p = $('<span class="badge badge-danger">Välj typ!</span>');
        p.insertAfter(typeTwo);
        // typeTwo.after(p);
      }
    } 
    console.log(this.players);
    console.log('clicked');
  }
}
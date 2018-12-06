class PlayersOptions extends Component {
  constructor() {
    super();
    this.players = [];
    this.active = true;
    this.addEvents({
      'click .startGameButton': 'getPlayers',
      'click #typeFirstPlayer': 'checkPlayer1Type',
      'click #typeSecondPlayer': 'checkPlayer2Type',
      'keyup #nameFirstPlayer': 'checkPlayerName1Value',
      'keyup #nameSecondPlayer': 'checkPlayerName2Value'
    });
  }

  //attaching event handler to definite element(inputs and selects)
  checkPlayer1Type() {
    this.checkPlayerType(document.getElementById('typeFirstPlayer'), 'Pascal');
  }
  checkPlayer2Type() {
    this.checkPlayerType(document.getElementById('typeSecondPlayer'), 'Fortran');
  }
  checkPlayerName1Value() {
    this.checkPlayerNameValue(document.getElementById('nameFirstPlayer'));
  }
  checkPlayerName2Value() {
    this.checkPlayerNameValue(document.getElementById('nameSecondPlayer'));
  }


  //function to check if user enter smth in input, which remove previous warnings
  checkPlayerNameValue(input) {
    let errorMessages = input.parentElement.querySelectorAll('.error-name');
    if (errorMessages.length > 0) {
      for (let i = 0; i < errorMessages.length; i++) {
        input.parentNode.removeChild(errorMessages[i]);
      }
    }
  }

  //function to check if user click on select and select smth, which remove previous warnings
  // and set name to name-input if user selects "Bot" and doesn't enter any name
  checkPlayerType(typeOption, name) {
    if (typeOption.value === 'bot') {
      if (typeOption.previousElementSibling.value === '') {
        typeOption.previousElementSibling.value = name;
      }
      let badges = typeOption.parentElement.querySelectorAll('.badge');
      if (badges.length > 0) {
        for (let i = 0; i < badges.length; i++) {
          typeOption.parentNode.removeChild(badges[i]);
        }
      }
    } else if (typeOption.value === 'human') {
      let badges = typeOption.parentElement.querySelectorAll('.error-type');
      if (badges.length > 0) {
        for (let i = 0; i < badges.length; i++) {
          typeOption.parentNode.removeChild(badges[i]);
        }
      }
    } else {
      return;
    }
  }

  getPlayers() {
    this.active = false;
    $('.badge').remove();
    let p = '';
    this.players.length = 0;

    let validateType = function (player) {
      let value = player.value;
      if (value === 'fake') {
        return false;
      } else {
        return true;
      }
    }

    let typeOne = document.getElementById('typeFirstPlayer');
    let typeTwo = document.getElementById('typeSecondPlayer');

    let nameOne = document.getElementById('nameFirstPlayer');
    let nameTwo = document.getElementById('nameSecondPlayer');

    let validateName = function (name) {
      let letters = /^[A-Za-zÖöÅåÄä]+$/;
      if (name.value.match(letters) && name.value.length >= 2 && name.value.length <= 10) {
        return true;
      }
      else {
        return false;
      }
    };

    if (validateType(typeOne) &&
      validateType(typeTwo) &&
      validateName(nameOne) &&
      validateName(nameTwo)
    ) {
      $('.badge').remove();

      let playerOne = new Player(nameOne.value);
      let playerTwo = new Player(nameTwo.value);
      playerOne.human = true ? typeOne.value === 'human' : false;
      playerTwo.human = true ? typeTwo.value === 'human' : false;
      this.players.push(playerOne, playerTwo);
      return true;
    } else {

      if (!validateType(typeOne)) {
        p = $('<span class="badge badge-danger error-type">Välj typ!</span>');
        p.insertAfter(typeOne);
      }
      if (!validateType(typeTwo)) {
        p = $('<span class="badge badge-danger error-type">Välj typ!</span>');
        p.insertAfter(typeTwo);
      }
      if (!validateName(nameOne)) {
        p = $('<span class="badge badge-danger  error-name">Namn måste innehålla bara bokstäver och vara 2-10 långa</span>');
        p.appendTo(typeOne.parentNode);
      }
      if (!validateName(nameTwo)) {
        p = $('<span class="badge badge-danger error-name">Namn måste innehålla bara bokstäver och vara 2-10 långa</span>');
        p.appendTo(typeTwo.parentNode);
      }
      return false;
    }
  }
}
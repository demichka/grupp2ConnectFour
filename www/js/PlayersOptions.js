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

  randomColor() {
    let r = Math.random();
    let color1 = 'yellow';
    let color2 = 'red';
    if (r > 0.5) {
      color1 = 'red';
      color2 = 'yellow';
    }
    let colors = [color1, color2];
    return colors;
  }

  getPlayers() {
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
      } else {
        return false;
      }
    };

    if (validateType(typeOne) &&
      validateType(typeTwo) &&
      validateName(nameOne) &&
      validateName(nameTwo)
    ) {
      $('.badge').remove();
      let colors = this.randomColor();


      let playerOne;
      let playerTwo;
      if (typeOne.value === 'human') {
        playerOne = new Player(nameOne.value, colors[0]);
      }
      if (typeOne.value === 'bot') {
        playerOne = new PlayerBot(nameOne.value, colors[0]);
      }
      if (typeTwo.value === 'human') {
        playerTwo = new Player(nameTwo.value, colors[1]);
      }
      if (typeTwo.value === 'bot') {
        playerTwo = new PlayerBot(nameTwo.value, colors[1]);
      }

      this.players.push(playerOne, playerTwo);

      this.active = false;

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
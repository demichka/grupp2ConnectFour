class PlayerOptionPage extends Component {
    constructor() {
        super();
        this.players = [];
        this.addEvents({
            'click .startGameButton': 'getPlayers'
        });
    }

    getPlayers() {
        let nameOne = $('#nameFirstPlayer').val();
        let typeOne = $('#typeFirstPlayer').val();
        let nameTwo = $('#nameSecondPlayer').val();
        let typeTwo = $('#typeSecondPlayer').val();
        this.players.length = 0;
        let playerOne = new Player(nameOne);
        let playerTwo = new Player(nameTwo);
        playerOne.human = true ? typeOne ==='human' : false;
        playerTwo.human = true ? typeTwo ==='human' : false;
        let p = $('<span class="badge badge-danger">Välj typ!</span>');
        if (typeOne === 'fake') {
            $('#typeFirstPlayer').parents('.input-group').after(p);
        }
        else if (typeTwo === 'fake') {
            $('#typeSecondPlayer').parent('.input-group').append(p);
        }
        this.players.push(playerOne, playerTwo);
        console.log(this.players);
        console.log('clicked');
    }
}
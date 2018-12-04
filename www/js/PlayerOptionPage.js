class PlayerOptionPage extends Component {
    constructor() {
        super();
        this.players = [];
        this.addEvents({
            'click .startGameButton': 'getPlayers'
        });
    }

    getPlayers() {
        let name = this.baseEl.find('#nameFirstPlayer').val();
        let type = this.baseEl.find('#typeFirstPlayer').val();
    }
}
class GameBoard extends Component {
    constructor(page) {
        super();
        this.active = false;
        this.playersNames = new PlayersNames();
        this.currentPlayer = '';
        this.page = page;
    }
    createGrid() {
        this.active = true;

        this.grid = [];
        for (let col = 0; col < 7; col++) {
            this.column = new Column(col + 1, this);
            this.column.createSlots();
            this.grid.push(this.column);
        }
        console.log(this.grid);
    }

    whoIsCurrent(players) {
        if (players.length > 0) {
            for (let i = 0; i < players.length; i++) {
                if (players[i].myTurn) {
                    this.currentPlayer = players[i];
                }
            }
        }
        return this.currentPlayer;
    }

    changePlayer() {
        for (let i = 0; i < this.playersNames.players.length; i++) {
            this.playersNames.players[i].myTurn = !this.playersNames.players[i].myTurn;
            this.whoIsCurrent(this.playersNames.players);
        }
        this.page.render();
    }

}
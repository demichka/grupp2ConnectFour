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
            this.column = new Column(col, this);
            this.column.createSlots();
            this.grid.push(this.column);
        }
        console.log(this.grid);
    }

    checkConnectionsInColumn(column) {
        let countRed = 0;
        let countYellow = 0;
        for (let j = 0; j < column.slots.length; j++) {
            let slot = column.slots[j];
            if (slot.color === 'red') {
                countRed++;
                countYellow = 0;
            }
            if (slot.color === 'yellow') {
                countYellow++;
                countRed = 0; 
            } 
        }
        if (countRed === 4) {
            this.youAreWinner('Red');
        }
        if (countYellow === 4) {
            this.youAreWinner('Yellow');
        }
        console.log('red in column ', countRed);
        console.log('yellow in column', countYellow); 
    }

    checkConnectionsInRow(indexOfDropped) {
        let countRedRow = 0;
        let countYellowRow = 0;
        for (let i = 0; i < this.grid.length; i++) {
            let column = this.grid[i];
            if (column.slots[indexOfDropped].color === 'red') {
                countRedRow++;
                countYellowRow = 0;
            }
            if (column.slots[indexOfDropped].color === 'yellow') {
                countYellowRow++;
                countRedRow = 0; 
            } 
        }
        if (countRedRow === 4) {
            this.youAreWinner('Red');
        }
        if (countYellowRow === 4) {
            this.youAreWinner('Yellow');
        }
        console.log('red in row ', countRedRow);        
        console.log('yellow in row', countYellowRow); 
    }

    youAreWinner(color) {
        window.alert(`${color} har vunnit!`);
        this.page.restartGame();
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
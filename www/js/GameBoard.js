class GameBoard extends Component {
    constructor(page) {
        super();
        this.active = false;
        this.playersNames = new PlayersNames();
        this.currentPlayer = '';
        this.page = page;
        this.columnsCount = 7;
        this.rowsCount = 6;
    }
    createGrid() {
        this.active = true;
        this.grid = [];
        for (let col = 0; col < this.columnsCount; col++) {
            this.column = new Column(col, this);
            this.column.createSlots();
            this.grid.push(this.column);
        }
    }

    checkConnectionsInColumn(column) {
        let countRed = 0;
        let countYellow = 0;
        for (let j = 0; j < column.slots.length  && countRed < 4 && countYellow < 4; j++) {
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
        this.checkWhoIsWon(countRed, countYellow);
        return;
    }

    checkConnectionsInRow(indexOfDropped) {
        let countRed = 0;
        let countYellow = 0;
        for (let i = 0; i < this.grid.length && countRed < 4 && countYellow < 4; i++) {
            let column = this.grid[i];
            if (column.slots[indexOfDropped].color === 'red') {
                countRed++;
                countYellow = 0;
            }
            if (column.slots[indexOfDropped].color === 'yellow') {
                countYellow++;
                countRed = 0;
            }
        }
        this.checkWhoIsWon(countRed, countYellow);
        return;
    }

    checkConnectionsInDecreasingDiagonal(indexX, indexY) {
        let countRed = 0;
        let countYellow = 0;

        //Define first item in the decreasing diagonal based on dropped brick's coordinates
        let j = indexY; // Y-coordinate
        let i = indexX; // X-coordinate
        while (i > 0 && j < this.rowsCount - 1) {
            i--;
            j++;
        }

        //Check decreasing diagonal for matching one-color bricks in a row
        while(i < this.columnsCount && j >= 0 && countRed < 4 && countYellow < 4) {
            if(this.grid[i].slots[j].color === 'red') {
                countRed++;
                countYellow = 0;            
            }
            if(this.grid[i].slots[j].color === 'yellow') {
                countYellow++;
                countRed = 0;
            }
            i++;
            j--;
        }
        this.checkWhoIsWon(countRed, countYellow);
        return;
    }

    checkConnectionsInIncreasingDiagonal(indexX, indexY) {
        let countRed = 0;
        let countYellow = 0;

        //Define first item in the increasing diagonal based on dropped brick's coordinates
        let j = indexY;
        let i = indexX;
        while (i < this.columnsCount - 1 && j < this.rowsCount - 1) {
            i++;
            j++;
        }
        //Check increasing diagonal for matching one-color bricks in a row 
        while(i >= 0 && j >= 0 && countRed < 4 && countYellow < 4) {
            if(this.grid[i].slots[j].color === 'red') {
                countRed++;
                countYellow = 0;                        
            }
            if(this.grid[i].slots[j].color === 'yellow') {
                countYellow++;
                countRed = 0;
            }
            i--;
            j--;
        }
        this.checkWhoIsWon(countRed, countYellow);
        return;
    }

    checkWhoIsWon(countRed, countYellow) {
        if(countRed === 4) {
            this.youAreWinner('Red');
            return true;
        }
        if(countYellow === 4) {
            this.youAreWinner('Yellow');
            return true;
        }
    }
    youAreWinner(color) {
        this.page.restartGame();
        window.alert(`${color} har vunnit!`);
    }


    whoIsCurrent(players) {
        if (players.length > 0) {
            for (let i = 0; i < players.length; i++) {
                if (players[i].myTurn) {
                    this.currentPlayer = players[i];
                    if(!this.currentPlayer.human) {
                        this.currentPlayer.botMove();
                    }
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
        console.log(this.currentPlayer);
        this.page.render();
    }

    

}
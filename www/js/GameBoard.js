class GameBoard extends Component {
    constructor(page) {
        super();
        this.active = false;
        this.playersNames = new PlayersNames();
        this.currentPlayer = '';
        this.page = page;
        this.columnsCount = 7;
        this.rowsCount = 6;
        this.clickEnabled = true;
        this.slotsFilledWithBricks = 0;

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

    giveColumnToBot() {
        let columnIndices = [0, 1, 2, 3, 4, 5, 6];
        do {
            let columnIndicesIndex = Math.floor((Math.random() * columnIndices.length));
            let columnIndex = columnIndices[columnIndicesIndex];
            if (this.grid[columnIndex].isEmpty) {
                return this.grid[columnIndex];
            } else {
                columnIndices.splice(columnIndicesIndex, 1);
            }
        } while (columnIndices.length > 0);
    }

    checkConnectionsInColumn(column) {
        let countRed = 0;
        let countYellow = 0;
        for (let j = 0; j < column.slots.length && countRed < 4 && countYellow < 4; j++) {
            let slot = column.slots[j];
            if (slot.color === 'red') {
                countRed++;
                countYellow = 0;
            } else if (slot.color === 'yellow') {
                countYellow++;
                countRed = 0;
            } else {
                countRed = 0;
                countYellow = 0;
            }
        }
        return this.checkWhoWon(countRed, countYellow);
    }

    checkConnectionsInRow(indexOfDropped) {
        let countRed = 0;
        let countYellow = 0;
        for (let i = 0; i < this.grid.length && countRed < 4 && countYellow < 4; i++) {
            let column = this.grid[i];
            if (column.slots[indexOfDropped].color === 'red') {
                countRed++;
                countYellow = 0;
            } else if (column.slots[indexOfDropped].color === 'yellow') {
                countYellow++;
                countRed = 0;
            } else {
                countRed = 0;
                countYellow = 0;
            }
        }
        return this.checkWhoWon(countRed, countYellow);
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
        while (i < this.columnsCount && j >= 0 && countRed < 4 && countYellow < 4) {
            if (this.grid[i].slots[j].color === 'red') {
                countRed++;
                countYellow = 0;
            } else if (this.grid[i].slots[j].color === 'yellow') {
                countYellow++;
                countRed = 0;
            } else {
                countRed = 0;
                countYellow = 0;
            }
            i++;
            j--;
        }
        return this.checkWhoWon(countRed, countYellow);
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
        while (i >= 0 && j >= 0 && countRed < 4 && countYellow < 4) {
            if (this.grid[i].slots[j].color === 'red') {
                countRed++;
                countYellow = 0;
            } else if (this.grid[i].slots[j].color === 'yellow') {
                countYellow++;
                countRed = 0;
            } else {
                countRed = 0;
                countYellow = 0;
            }
            i--;
            j--;
        }
        return this.checkWhoWon(countRed, countYellow);
    }

    checkWhoWon(countRed, countYellow) {
        if (countRed === 4) {
            this.youAreWinner('Red');
            return true;
        }
        if (countYellow === 4) {
            this.youAreWinner('Yellow');
            return true;
        }
        else if (this.slotsFilledWithBricks === 42) {
            this.gameIsTied('#tiedModal');
            // alert('Det blev oavgjort!');
        }
        else {
            return false;
        }
        
    }

    checkWinner(column, indexOfDropped) {
        if (this.checkConnectionsInColumn(column) ||
            this.checkConnectionsInRow(indexOfDropped) ||
            this.checkConnectionsInDecreasingDiagonal(column.columnNumber, indexOfDropped) ||
            this.checkConnectionsInIncreasingDiagonal(column.columnNumber, indexOfDropped)) {
            return;
        }
        this.changePlayer();
    }

    get isEmpty() {
        return this.slots[0].color === 'empty';
    }

    gameIsTied() {
        setTimeout(() => $('#tiedModal').tiedModal('show'), 0);
        console.log('tiedModal show');
    }

    youAreWinner() {
        setTimeout(() => $('#modal').modal('show'), 0);
        console.log('modal show');
    }

    whoIsCurrent(players) {
        return players.find((player) => {
            return player.myTurn;
        });
    }

    botMakeMove() {
        if (!this.currentPlayer.human) {
            setTimeout(() => {
                const column = this.giveColumnToBot();
                const indexOfDropped = column.makeMove();
                if (indexOfDropped >= 0) {
                    setTimeout(() => {
                        this.checkWinner(column, indexOfDropped);
                    }, 1000);
                }
            }, 1000);
        }
    }

    changePlayer() {
        for (let i = 0; i < this.playersNames.players.length; i++) {
            this.playersNames.players[i].myTurn = !this.playersNames.players[i].myTurn;
        }
        this.currentPlayer = this.whoIsCurrent(this.playersNames.players);
        this.botMakeMove();
        this.page.render();
    }
}
class GameBoard extends Component {
    constructor(page) {
        super();
        this.active = false;
        this.page = page;
        this.columnsCount = 7;
        this.rowsCount = 6;
        this.clickEnabled = true;
    }
    createGrid() {
        this.grid = [];
        for (let col = 0; col < this.columnsCount; col++) {
            this.column = new Column(col, this);
            this.column.createSlots();
            this.grid.push(this.column);
        }
    }
    

    resetGrid() {
        this.active = false;
        this.grid.length = 0;
        this.createGrid();
        this.render();

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
        return false;
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

    youAreWinner() {
        setTimeout(() => $('#modal').modal('show'), 0);
        console.log('modal show');
    }

    botMakeMove() {
        if (this.active && !this.page.currentPlayer.human) {
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
        if(this.active === true) {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].myTurn = !this.players[i].myTurn;
            }
            this.page.currentPlayer = this.page.whoIsCurrent(this.players);
            this.botMakeMove();
            this.page.render();
        }
    }
}
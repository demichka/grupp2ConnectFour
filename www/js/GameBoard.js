class GameBoard extends Component {
    constructor(page) {
        super();
        this.active = false;
        this.page = page;
        this.columnsCount = 7;
        this.rowsCount = 6;
        this.clickEnabled = true;
        this.gameOver = false;
        this.audio = new Audio("/audio/drop.mp3");
        this.toggleAudioBtn = new ToggleAudioButton(this, this.audio);
        this.movesCount = 0;


    }
    createGrid() {
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
            let redWon = this.players.filter(player => player.color === 'red');
            this.youAreWinner(redWon[0]);
            return true;
        }
        if (countYellow === 4) {
            let yellowWon = this.players.filter(player => player.color === 'yellow');
            this.youAreWinner(yellowWon[0]);
            return true;
        }
        return false;
    }

    checkTieGame() {
        if(this.movesCount === 42) {
            this.clickEnabled = false;
            this.gameOver = true;
            return true;
        }
    }

    checkWinner(column, indexOfDropped) {
        if (this.checkConnectionsInColumn(column) ||
            this.checkConnectionsInRow(indexOfDropped) ||
            this.checkConnectionsInDecreasingDiagonal(column.columnNumber, indexOfDropped) ||
            this.checkConnectionsInIncreasingDiagonal(column.columnNumber, indexOfDropped)) {
            this.gameOver = true;
            this.page.currentPlayer.winner = true;
            this.record = false;
            let unique = -1;
            let winner = this.page.currentPlayer;
            JSON._load('highscore.json').then(function (winners) {
                unique = winners.findIndex(win => win.score === winner.score);
                if (unique < 0) {
                    winners.push(winner);
                    winners.sort((playerA, playerB) => {
                        return playerA.score - playerB.score;
                    });
                    if (winners.indexOf(winner) <= 9) {
                        unique = -2;
                    }
                JSON._save('highscore', winners);
                }
                else {
                    return;
                }
            });
            setTimeout(() => {
                if(unique === -2) {
                    this.record = true;
                }
            }, 50);
            return;
        }
        else if(this.checkTieGame()) {
            setTimeout(() => {
                this.page.modal.showTieModal(true);
            }, 150);
        }
        this.changePlayer();
    }

    youAreWinner(name) {
        setTimeout(() => {
        this.page.modal.showModal(name, this.record);            
        }, 150);
        //this.board.audio2.play();
    }

    botMakeMove() {
        if (this.active && !this.page.currentPlayer.human) {
            setTimeout(() => {
                const column = this.giveColumnToBot();
                const indexOfDropped = column.makeMove();
                if (indexOfDropped >= 0) {
                    setTimeout(() => {
                        this.checkWinner(column, indexOfDropped);
                    }, 600);
                }
            }, 600);
        }
    }

    changePlayer() {
        if (this.active === true) {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].myTurn = !this.players[i].myTurn;
            }
            this.page.currentPlayer = this.page.whoIsCurrent(this.players);
            this.botMakeMove();
            this.page.render();
        }
    }
}
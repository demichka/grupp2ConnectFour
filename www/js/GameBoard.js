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
        this.color1 = 'red';
        this.color2 = 'yellow';
    }
    createGrid() {
        this.grid = [];
        for (let col = 0; col < this.columnsCount; col++) {
            this.column = new Column(col, this);
            this.column.createSlots();
            this.grid.push(this.column);
        }
        this.gameStartTime = 0;
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
        let result = {
            color1: countRed,
            color2: countYellow
        }
        return result;
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
        let result = {
            color1: countRed,
            color2: countYellow
        }
        return result;
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
        let result = {
            color1: countRed,
            color2: countYellow
        }
        return result;
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
        let result = {
            color1: countRed,
            color2: countYellow
        }
        return result;
    }

    checkTieGame() {
        if (this.movesCount === 42) {
            this.clickEnabled = false;
            this.gameOver = true;
            return true;
        }
        else {
            return false;
        }
    }

    gotWinnerColor(direction) {
        if (direction.color1 === 4) {
            return this.color1;
        } else if (direction.color2 === 4) {
            return this.color2;
        } else {
            return false;
        }
    }

    checkWinner(column, indexOfDropped) {
        let color = this.gotWinnerColor(this.checkConnectionsInColumn(column));
        if (color) {
            return color;
        }
        color = this.gotWinnerColor(this.checkConnectionsInRow(indexOfDropped));
        if (color) {
            return color;
        }
        color = this.gotWinnerColor(this.checkConnectionsInDecreasingDiagonal(column.columnNumber, indexOfDropped));
        if (color) {
            return color;
        }
        color = this.gotWinnerColor(this.checkConnectionsInIncreasingDiagonal(column.columnNumber, indexOfDropped));
        if (color) {
            return color;
        }
        return false;
    }

    checkWhoWon(color) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].color === color) {
                return this.players[i];
            }
        }
    }

    stopGame() {
        this.gameOver = true;
        this.gameFinishTime = performance.now();
    }

    getGameDuration() {
        return this.gameFinishTime - this.gameStartTime;
    }

    recordHighscore(winner, duration) {
        winner.time = duration;
        let recorded = false;
        return JSON._load('highscore.json').then((winners) => {
            winners.push(winner);
            if (winners.length > 1) {
                winners.sort((playerA, playerB) => {
                    return playerA.score - playerB.score || playerA.time - playerB.time;
                });
            }
            if (winners.indexOf(winner) <= 9) {
                recorded = true;
            }
            winners = winners.slice(0, 10);
            return JSON._save('highscore', winners).then(() => {
                return recorded;
            });
        });
    }
    checkWinner1(column, indexOfDropped) {
        if (this.checkConnectionsInColumn(column) ||
            this.checkConnectionsInRow(indexOfDropped) ||
            this.checkConnectionsInDecreasingDiagonal(column.columnNumber, indexOfDropped) ||
            this.checkConnectionsInIncreasingDiagonal(column.columnNumber, indexOfDropped)) {
            this.gameOver = true;
            this.page.currentPlayer.winner = true;
            let gameTime = performance.now();
            this.record = false;
            let getInHighscore = -1;
            let winner = this.page.currentPlayer;
            winner.time = gameTime - this.page.time;
            JSON._load('highscore.json').then(function (winners) {
                winners.push(winner);
                if (winners.length > 1) {
                    winners.sort((playerA, playerB) => {
                        return playerA.score - playerB.score || playerA.time - playerB.time;
                    });
                    
                }
                if (winners.indexOf(winner) <= 9) {
                    getInHighscore = -2;
                }

                JSON._save('highscore', winners);
            });
            setTimeout(() => {
                if (getInHighscore === -2) {
                    this.record = true;
                }
            }, 100);
            this.gameStartTime = 0;
            return;
        } else if (this.checkTieGame()) {
            setTimeout(() => {
                this.page.modal.showTieModal(true);
            }, 150);
        }
        this.changePlayer();
    }

    botMakeMove() {
        if (this.active && (this.page.currentPlayer instanceof (PlayerBot))) {
            setTimeout(() => {
                const column = this.giveColumnToBot();
                const indexOfDropped = column.makeMove();
                if (indexOfDropped >= 0) {
                    const winnerColor = this.checkWinner(column, indexOfDropped);
                    if (!winnerColor) {
                        let isTied = this.checkTieGame();
                        if (isTied) {
                            setTimeout(() => {
                                this.page.modal.showTieModal(true);
                            }, 150);
                        }
                        else {
                            setTimeout(() => {
                                this.changePlayer();
                            }, 500);
                            return;
                        }
                    } else {
                        setTimeout(() => {
                            this.stopGame();
                        const winnerPlayer = this.checkWhoWon(winnerColor);
                        const duration = this.getGameDuration();
                        this.recordHighscore(winnerPlayer, duration)
                            .then(recorded => {
                                this.page.modal.showModal(winnerPlayer, recorded);
                            });
                        }, 700);
                    }
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
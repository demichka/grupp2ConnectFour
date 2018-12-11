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
        for (let i = 0; i < this.grid.length && countRedRow < 4 && countYellowRow < 4; i++) {
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

    checkConnectionsInDiagonal(indexX, indexY) {
        let countRed = 0;
        let countYellow = 0;
        const columnsCount = 7;
        const rowsCount = 6;

        console.log(indexX, indexY);
        //Define first item in the increasing diagonal based on dropped brick's coordinates
        let j = indexY; // Y-coordinate
        let i = indexX; // X-coordinate
        while (i > 0 && j < rowsCount - 1) {
            i--;
            j++;
        }

        console.log('first: ', i,j);
        //Check increasing diagonal for matching one-color bricks in a row
        while(i < columnsCount && j >= 0 && countRed < 4 && countYellow < 4) {
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
        if(countRed === 4) {
            this.youAreWinner('Red');
            return;
        }
        if(countYellow === 4) {
            this.youAreWinner('Yellow');
            return;
        }
        //Define first item in the decreasing diagonal based on dropped brick's coordinates
        j = indexY;
        i = indexX;
        while (i < columnsCount - 1 && j < rowsCount - 1) {
            i++;
            j++;
        }

        countRed = 0;
        countYellow = 0;
        console.log('second ',i,j);
        //Check decreasing 
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
        if(countRed === 4) {
            this.youAreWinner('Red');
            return;
        }
        if(countYellow === 4) {
            this.youAreWinner('Yellow');
            return;
        }

        console.log('Diagonal Red ', countRed);
        console.log('Diagonal Yellow ', countYellow);
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
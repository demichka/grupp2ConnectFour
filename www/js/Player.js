class Player {
    constructor(name, color, currentPlayer) {
        this.name = name;
        this.human = true;
        this.color = color;
        this.currentPlayer = this.firstTurn();
    }


    firstTurn() {
        if (this.color === 'red') {
            this.currentPlayer = true;
        }
        else {
            this.currentPlayer = false;
        }
        return this.currentPlayer;
    }
}
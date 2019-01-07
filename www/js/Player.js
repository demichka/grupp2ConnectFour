class Player {
    constructor(name, color) {
        this.name = name;
        this.human = true;
        this.color = color;
        this.myTurn = this.firstTurn();
        this.score = 0;
        this.winner = false;
        
    }


    firstTurn() {
        if (this.color === 'red') {
            this.myTurn = true;
        }
        else {
            this.myTurn = false;
        }
        return this.myTurn;
    }
}
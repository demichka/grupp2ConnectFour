class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.myTurn = this.firstTurn();
        this.score = 0;        
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
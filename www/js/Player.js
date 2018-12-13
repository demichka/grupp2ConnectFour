class Player {
    constructor(name, color) {
        this.name = name;
        this.human = true;
        this.color = color;
        this.myTurn = this.firstTurn();
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
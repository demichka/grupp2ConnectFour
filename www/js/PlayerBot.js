class PlayerBot extends Player {
    constructor(){
        super();
        this.clickColumn = new Column();
    }

    botMove() {
        if (this.myTurn === true) {
            this.clickColumn.makeMove();
        }
    }
}
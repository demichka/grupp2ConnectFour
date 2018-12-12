class PlayerBot extends Player {
    constructor(name, color) {
        super(name, color);
    }

    chooseColumn() {
        let columnNum = 'column' + Math.floor((Math.random() * 7) + 1);
        return columnNum;
    }

    botMove() {
        if (this.myTurn) {
            let column = this.chooseColumn();
            console.log(column);
            setTimeout(() => {
                $('.'+ column).click();
            }, 1000);
        }
    }
}
class Slots extends Component {
    constructor (gamePage, row, col) {
        super();
        this.gamePage = gamePage;
        this.row = row;
        this.col = col;
        this.color = '';
        this.addEvents({
            'click div': 'click'
        });
       //this.testColor();
    }

    click(e){
        console.log(e)
        e.stopPropagation();
        this.gamePage.columnClicked(this.col);
    }

    testColor(){
        let r = Math.random();
        this.color = r < .3 ? 'yellow': this.color;
        this.color = r > .7 ? 'red': this.color;
    }
}
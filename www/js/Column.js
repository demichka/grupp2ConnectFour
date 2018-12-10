class Column extends Component {
    constructor(number, board) {
        super();
        this.columnNumber = number;
        this.isClicked = false;
        this.board = board;
        this.addEvents({
            'click div': 'click'
        });
    }

    createSlots() {
        this.slots = [];

        for (let slot = 0; slot < 6; slot++) {
            this.slots.push(new Slots(slot));
        }
    }

    click(e){
        e.stopPropagation();
        console.log('clicked');
        this.isClicked = !this.isClicked;
        this.board.columnClicked(this.columnNumber, this.isClicked);
        this.isClicked = !this.isClicked;
    }
}
class Column extends Component {
    constructor(number, board) {
        super();
        this.columnNumber = number;
        this.isClicked = false;
        this.board = board;
        this.addEvents({
            'click .column': 'click'
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
        let currentColor = this.board.currentPlayer.color;
        console.log(currentColor);
        this.board.columnClicked(this.columnNumber, this.isClicked);

        for (let i = this.slots.length - 1; i >= 0; i--) {
            const element = this.slots[i];
            if (element.color === 'empty') {
                element.color = currentColor;
                element.render();
                break;
            }
            
        }
        this.isClicked = !this.isClicked;
        console.log(currentColor);
    }
}
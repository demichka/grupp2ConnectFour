class Column extends Component {
    constructor(number, board) {
        super();
        this.columnNumber = number;
        this.board = board;
        this.addEvents({
            'click .column': 'clickColumn'
        });
    }

    createSlots() {
        this.slots = [];

        for (let slot = 0; slot < 6; slot++) {
            this.slots.push(new Slots(slot));
        }

    }

    clickColumn(e) {
        e.stopPropagation();
        let currentColor = this.board.currentPlayer.color;

        for (let i = this.slots.length - 1; i >= 0; i--) {
            const element = this.slots[i];
            if (element.color === 'empty') {
                element.color = currentColor;
                element.render();
                break;
            }
        }
        this.board.changePlayer();
    }
}
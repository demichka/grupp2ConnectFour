class Column extends Component {
    constructor(number, board) {
        super();
        this.columnNumber = number;
        this.board = board;
        this.redSlots = 0;
        this.yellowSlots = 0;
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
        let indexOfDropped = 0;
        for (let i = this.slots.length - 1; i >= 0; i--) {
            const element = this.slots[i];
            if (element.color === 'empty') {
                element.color = currentColor;
                indexOfDropped = i;
                element.render();
                break;
            }
        }
        setTimeout(() => {
            this.board.checkConnectionsInColumn(this);
            this.board.checkConnectionsInRow(indexOfDropped);
            this.board.checkConnectionsInDiagonal(this.columnNumber, indexOfDropped);
        }, 300);
        console.log('next move');
        
        this.board.changePlayer();
    }
}
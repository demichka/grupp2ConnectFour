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

        for (let slot = 0; slot < this.board.rowsCount; slot++) {
            this.slots.push(new Slots(slot));
        }

    }

    clickColumn(e) {
        e.stopPropagation();
        this.makeMove(this);
    }

    makeMove(column) {
        if (column.slots[0].color === 'empty') {
            let currentColor = column.board.currentPlayer.color;
            let indexOfDropped = 0;
            for (let i = column.slots.length - 1; i >= 0; i--) {
                const element = column.slots[i];
                if (element.color === 'empty') {
                    element.color = currentColor;
                    indexOfDropped = i;
                    element.render();
                    break;
                }
            }
            setTimeout(() => {
                if (!this.board.checkConnectionsInColumn(this) &&
                !this.board.checkConnectionsInRow(indexOfDropped) &&
                !this.board.checkConnectionsInDecreasingDiagonal(this.columnNumber, indexOfDropped)&&
                !this.board.checkConnectionsInIncreasingDiagonal(this.columnNumber, indexOfDropped)) {
                    this.board.changePlayer();
                }
            }, 100);
        }
        else {
            window.alert('Välj annan kolumn!');
        }
    }
}
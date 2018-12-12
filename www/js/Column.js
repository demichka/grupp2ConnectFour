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
                column.board.checkConnectionsInColumn(column);
                column.board.checkConnectionsInRow(indexOfDropped);
                column.board.checkConnectionsInDecreasingDiagonal(column.columnNumber, indexOfDropped);
                column.board.checkConnectionsInIncreasingDiagonal(column.columnNumber, indexOfDropped);
            }, 300);

            if (column.board.active) {
                column.board.changePlayer();
            }
        }
        else {
            window.alert('Välj annan kolumn!');
        }
    }
}
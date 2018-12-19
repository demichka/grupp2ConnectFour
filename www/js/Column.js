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
        if (this.board.currentPlayer.human && this.board.clickEnabled) {
            e.stopPropagation();
            this.board.clickEnabled = false;
            const indexOfDropped = this.makeMove();
            if (indexOfDropped >= 0) {
                setTimeout(() => {
                    this.board.checkWinner(this, indexOfDropped);
                    this.board.clickEnabled = true;
                }, 100);
            }
        }
        else {
            return;
        }        
    }

    get isEmpty() {
        return this.slots[0].color === 'empty';
    }

    makeMove() {
        if (this.isEmpty) {
            let currentColor = this.board.currentPlayer.color;
            for (let i = this.slots.length - 1; i >= 0; i--) {
                const element = this.slots[i];
                if (element.color === 'empty') {
                    element.color = currentColor;
                    element.render();
                    return i;
                }
            }
        }
        else {
            window.alert('Välj annan kolumn!');
            return -1;
        }
    }
}
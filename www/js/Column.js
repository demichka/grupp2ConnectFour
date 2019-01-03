class Column extends Component {
    constructor(number, board, page) {
        super();
        this.page = page;
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
        if (this.board.page.currentPlayer.human && this.board.clickEnabled && !this.board.gameOver) {
            e.stopPropagation();
            this.board.clickEnabled = false;
            const indexOfDropped = this.makeMove();
            if (indexOfDropped >= 0) {
                setTimeout(() => {
                    this.board.checkWinner(this, indexOfDropped);
                    this.board.clickEnabled = true;
                }, 1000);
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
            let currentColor = this.board.page.currentPlayer.color;
            for (let i = this.slots.length - 1; i >= 0; i--) {
                const element = this.slots[i];
                if (element.color === 'empty') {
                    element.color = currentColor;
                    element.isDropped = true;
                    // drop sound
                    this.board.audio.play();
                    this.board.page.currentPlayer.score++;
                    element.hole.render();
                    element.render();
                    setTimeout(() => {    
                        element.isDropped = false;
                    }, 500);
                    return i;
                }
            }
        } else {
           //here the modal for "Välj en annan kolumn" needs to be input
            window.alert('Välj annan kolumn!');
            return -1;
        }
    }
}
class GameBoard extends Component {
    constructor() {
        super();
        this.active = false;

    }
    createGrid() {
        this.active = true;
        $('.nameInput').hide();
        $('.abortGameButton').show();
        $('.startGameButton').hide();
        this.innerHeight = window.innerHeight / 2;
        this.slots = [];
        for (let row = 0; row < 6; row++) {
            let rowArray = [];
            for (let col = 0; col < 7; col++) {
                rowArray.push(new Slots(row, col));
            }
            this.slots.push(rowArray);
        }

    }

}
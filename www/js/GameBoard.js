class GameBoard extends Component {
    constructor() {
        super();
        this.active = false;
        this.column = new Column();
    }
    createGrid() {
        this.active = true;

        
        this.grid = [];
        for (let row = 0; row < 6; row++) {
            this.column.createSlots();
            this.grid.push(this.column);
        }
    }

}
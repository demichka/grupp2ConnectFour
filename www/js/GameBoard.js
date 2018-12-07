class GameBoard extends Component {
    constructor() {
        super();
        this.active = false;
    }
    createGrid() {
        this.active = true;

        
        this.grid = [];
        for (let col = 0; col < 7; col++) {
            this.column = new Column(col + 1);
            this.column.createSlots();
            this.grid.push(this.column);
        }
        console.log(this.grid);
    }

}
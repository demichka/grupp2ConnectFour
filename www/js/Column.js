class Column extends Component {
    constructor() {
        super();
    }

    createSlots() {
        this.slots = [];

        for (let slot = 0; slot < 7; slot++) {
            this.slots.push(new Slots());
        }
    }
}
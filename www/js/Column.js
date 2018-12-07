class Column extends Component {
    constructor() {
        super();
    }

    createSlots() {
        this.slots = [];

        for (let slot = 0; slot < 6; slot++) {
            this.slots.push(new Slots());
        }
    }
}
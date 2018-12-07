class Column extends Component {
    constructor(number) {
        super();
        this.columnNumber = number;
        this.clicked = false;
        this.addEvents({
            'click div': 'click'
        });
    }

    createSlots() {
        this.slots = [];

        for (let slot = 0; slot < 6; slot++) {
            this.slots.push(new Slots(slot));
        }
    }

    click(e){
        e.stopPropagation();
        this.clicked = true;
        console.log(this.columnNumber, this.clicked);
        this.clicked = false;
        console.log(this.columnNumber, this.clicked);

    }
}
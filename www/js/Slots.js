class Slots extends Component {
    constructor (number) {
        super();
        this.numberInColumn = number;
        this.color = 'empty';
        this.isDropped = false;
        this.hole = new SlotHole(this);
    }
}
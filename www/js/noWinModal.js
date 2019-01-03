class noWinModal extends Component {
    constructor(page) {
        super();
        this.page = page;
    }
    noWinner(){
         //if there is no winner
         this.render();
         $('#NWmodal').modal('show');
    }
}
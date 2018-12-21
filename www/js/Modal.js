class Modal extends Component{
    constructor(page){
        super();
        this.page = page;
    }
    showModal(winner){
        //if there is a winner
        this.winner = winner;
        this.render();
        $('#modal').modal('show');
    }
}
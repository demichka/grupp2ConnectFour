class Modal extends Component{
    constructor(page){
        super();
        this.page = page;

    }
    showModal(winner, record){
        //if there is a winner
        this.winner = winner;
        this.record = record;
        this.render();
        $('.modal').modal('show');
    }

    showTieModal(tieGame) {
        this.tieGame = tieGame;
        this.render();
        $('.modal').modal('show');
    }
}
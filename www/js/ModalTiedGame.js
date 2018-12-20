class ModalTiedGame extends Component{
    constructor(page){
        super();
        this.page = page;
    }
    tiedModal(){
        //if the game is tied
        setTimeout(() => $('#modal').modal('show'), 0);
        console.log('tieModal show');  
        //show this.modal in gameboard.html
    }
}
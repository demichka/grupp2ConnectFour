class TiedModal extends Component{
    constructor(page){
        super();
        this.page = page;
    }
    tiedModal(){
        //if the game is tied
        setTimeout(() => $('#tiedModal').tiedModal('show'), 0);
        console.log('tiedModal show');  
        //show this.modal in gameboard.html test
    }
}
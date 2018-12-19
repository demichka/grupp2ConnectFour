class Modal extends Component{
    constructor(page){
        super();
        this.page = page;
    }
    showModal(){
        //if there is a winner
        setTimeout(() => $('#modal').modal('show'), 0);
        console.log('modal show');  
        //show this.modal in gameboard.html test
    }
}
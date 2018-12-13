class RulesPage extends Component {

  constructor(){
    super();
    this.addRoute('/rules', 'Spelets regler');
    this.rules = new Rules();
  }


}

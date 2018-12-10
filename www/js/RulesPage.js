class RulesPage extends Component {

  constructor(){
    super();
    this.addRoute('/rules', 'Spelregler');
    this.rules = new Rules();
  }


}

class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Vårt spel', '/our-game'),
      new NavItem('Highscore', '/highscore'),
      new NavItem('Spelregler', '/rules')
    ];
    this.socialItems = new SocialItems();
  }

}
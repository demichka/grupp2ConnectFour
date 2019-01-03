class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Vårt spel', '/our-game'),
      new NavItem('Highscore', '/highscore'),
      new NavItem('Spelets regler', '/rules')
    ];
    this.socialItems = new SocialItems();
  }

}
$(function() {
  $(document).click(function (event) {
    $('.navbar-collapse').collapse('hide');
  });
});
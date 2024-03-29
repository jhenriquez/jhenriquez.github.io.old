require(['main'], function () {
  require(
    ['jquery', 'react', 'views/components/Github', 'views/components/MenuToggle', 'fullpage'],
    function ($, React, Github, MenuToggle) {

      $('#content').fullpage({
        anchors: ['Section1', 'Section2', 'Section3'],
        menu: '#in-page-menu',
        afterRender: function () {
          setTimeout(function () {
            $('.loading-screen').hide();
          }, 1000);
        }
      });      

      var menuToggle = new MenuToggle('.navigation', '.toggle-menu', 'open');
      var menuButtomToggle = new MenuToggle('.menu-line', '.toggle-menu', 'menu-line-open');
      var inpageToggle = new MenuToggle('#in-page-menu', '.toggle-menu', 'nav-hide-mobile');

      React.render(
        React.createElement(Github, {username: "jhenriquez", repositories: "4"}),
        document.getElementById('github-content')
      );
  });
});

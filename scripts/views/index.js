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

      var toggle = new MenuToggle('.navigation', '.toggle-menu', 'open');

      React.render(
        React.createElement(Github, {username: "jhenriquez", repositories: "4"}),
        document.getElementById('github-content')
      );
  });
});

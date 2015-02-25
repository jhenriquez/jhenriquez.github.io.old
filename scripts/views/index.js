require(['main'], function () {
  require(
    ['jquery', 'react', 'views/components/Github','fullpage'],
    function ($, React, Github) {

      $('#content').fullpage({
        anchors: ['Section1', 'Section2', 'Section3'],
        menu: '#in-page-menu',
        afterRender: function () {
          setTimeout(function () {
            $('.loading-screen').hide();
          }, 1000);
        }
      });

      React.render(
        React.createElement(Github, {username: "jhenriquez", repositories: "4"}),
        document.getElementById('github-content')
      );
  });
});

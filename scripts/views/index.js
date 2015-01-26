require(['../main'], function () {
  require(
    ['jquery','fullpage','views/components/Github'],
    function ($) {

      $('#content').fullpage({
        anchors: ['Section1', 'Section2', 'Section3'],
        menu: '#in-page-menu',
        afterRender: function () {
          setTimeout(function () {
            $('.loading-screen').hide();
          }, 1000);
        }
      });
  });
});

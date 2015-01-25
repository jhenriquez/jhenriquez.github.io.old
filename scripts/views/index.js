require(['../main'], function () {
  require(
    ['jquery','bootstrap', 'fullpage','views/components/Github'],
    function ($) {

      $('#content').fullpage({
        anchors: ['Section1', 'Section2', 'Section3'],
        menu: '#in-page-menu'
      });
  });
});

require(['../main'], function () {
  require(
    ['jquery','bootstrap', 'fullpage','views/components/Github'],
    function ($) {

      $('#content').fullpage({
        sectionsColor: ['#82938A', '#C3CBAC', '#4A4A45'],
        anchors: ['Section1', 'Section2', 'Section3'],
        menu: '#in-page-menu'
      });
  });
});
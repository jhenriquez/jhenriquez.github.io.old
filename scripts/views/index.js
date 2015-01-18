requirejs(['../main'], function() {
  requirejs(['jquery'], function () {
    requirejs(['bootstrap', 'fullpage'], function () {
      $('#content').fullpage({
        sectionsColor: ['#82938A', '#C3CBAC', '#4A4A45']
      });
    });
  });
});
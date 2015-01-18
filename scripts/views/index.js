requirejs(['../main'], function() {
  requirejs(['jquery', 'touchswipe'], function () {
    requirejs(['bootstrap', 'fullpage'], function () {

      $(document).ready(function () {
        $('#content').fullpage({
          sectionsColor: ['#82938A', '#C3CBAC', '#4A4A45']
        });
      });

    });
  });
});
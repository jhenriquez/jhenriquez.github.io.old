define(['views/components/MenuToggle'], function (MenuToggle) {

  var clickElement = function (el) {
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    el.dispatchEvent(ev);
  };


  describe('MenuToggle', function () {
    var toggler;
    
    beforeEach(function () {
      toggler = new MenuToggle('#menu', '#toggleButtom', 'toggleClass');
    });

    it('should throw an error if the provided toggleSelector does not match any element', function () {
      (function() { new MenuToggle('#menu', '#NonExistentElement', 'toggleClass'); }).should.throw(Error);
    });

    it('should use the provided toggleElement as a selector when a it is a string.', function () {
      var menu = new MenuToggle('#menu', '#toggleButtom', 'toggleClass');
      menu.toggleElement.should.be.ok();
      menu.toggleElement.should.instanceof(Element);
    });

    it('should throw Error if then provided toggleElement selector does not match any element.', function () {
      (function () { new MenuToggle('#NonExistent', '#toggleButtom', 'toggleClass'); }).should.throw(Error);    
    });

    it('should toggle the provided toggleClass every time the provided toggleButtom is clicked.', function () {
      toggler.toggleElement.classList.contains('toggleClass').should.not.be.ok;
      clickElement(toggler.toggleButtom);
      toggler.toggleElement.classList.contains('toggleClass').should.be.ok;
      clickElement(toggler.toggleButtom);
      toggler.toggleElement.classList.contains('toggleClass').should.not.be.ok;
    });
  });

});
define(function () {
  function MenuToggle(toggleElement, toggleButtom, toggleClass) {
    var self = this;
    this.toggleElement = undefined;
    this.toggleButtom = undefined;
    this.toggleClass = toggleClass;    

    if (typeof toggleElement === 'string') {
      this.toggleElement = document.querySelectorAll(toggleElement);

      if (!this.toggleElement || this.toggleElement.length === 0) {
        throw new Error('The provided toggleElement selector did not match any element.');
      }
    } else {
      if (toggleElement.constructor !== Element) {
        throw new Error('The provided toggleElement selector did not match any element.');
      }
      this.toggleElement = toggleElement;
    }

    this.toggleButtom = document.querySelector(toggleButtom);

    if (!this.toggleButtom) {
      throw new Error('The provided toggleButtom selector did not match any element.');
    }

    this.toggleButtom.addEventListener('click', function (e) {
        for(var i = 0; i < self.toggleElement.length; i++) {
          self.toggleElement[i].classList.toggle(self.toggleClass);
        }
    }, false);
  }

  return MenuToggle;
});
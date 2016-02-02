(function () {
'use strict';

var ENTER_KEY = 13;

var keyUp = function(evt) {
  if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === ENTER_KEY) {
    var target = evt.target;
    var form = target.closest('form');
    if (!form) {
      return;
    }
    var submitButton = form.querySelector('[type=submit]');
    if (!submitButton) {
      return;
    }

    submitButton.click();
    evt.preventDefault();
    evt.stopPropagation();
  }
};
// register the handler
document.addEventListener('keydown', keyUp, false);
}());

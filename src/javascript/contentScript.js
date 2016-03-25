'use strict'; {
  const ENTER_KEY = 13;

  const submitForm = (evt) => {
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === ENTER_KEY) {
      const target = evt.target;
      const form = target.closest('form');
      if (!form) {
        return;
      }
      const submitButton = form.querySelector('[type=submit]');
      if (!submitButton) {
        return;
      }

      submitButton.click();
      evt.preventDefault();
      evt.stopPropagation();
    }
  };

  document.addEventListener('keydown', submitForm, false);
}

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
      if (submitButton) {
        submitButton.click();
      } else {
        // check old design
        const oldDesignSubmitButton = form.querySelector('button.comment-form-submit-gaia');
        if (oldDesignSubmitButton) {
          oldDesignSubmitButton.click();
        } else {
          return;
        }
      }

      evt.preventDefault();
      evt.stopPropagation();
    }
  };

  document.addEventListener('keydown', submitForm, false);
}

const formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

// console.log(formData);
// console.log(formEl);

const fillFormFields = () => {
  try {
    // console.log(localStorage.getItem('feedback-form-state'));
    if (localStorage.getItem('feedback-form-state') === null) {
      return;
    }

    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    // console.log(formDataFromLS);

    for (const fieldName in formDataFromLS) {
      // console.log(fieldName);

      formData[fieldName] = formDataFromLS[fieldName];

      // console.log(formData[fieldName]);

      formEl.elements[fieldName].value = formDataFromLS[fieldName];

      // console.log(formEl.elements[fieldName].value);
    }
  } catch (err) {
    console.log(err);
  }
};

fillFormFields();

const onFormInputFn = ({ target: formfieldEl }) => {
  // console.dir(formfieldEl);

  const { name: fieldName, value: fieldValue } = formfieldEl;

  // console.log(fieldName);
  // console.log(fieldValue);

  formData[fieldName] = fieldValue.trim();

  // console.log(formData);

  try {
    const formDataLS = JSON.stringify(formData);

    localStorage.setItem('feedback-form-state', formDataLS);

    // console.log(formDataLS);
  } catch (err) {
    console.log(err);
  }
};

formEl.addEventListener('input', onFormInputFn);

const onFormSubmitFn = event => {
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);

    event.preventDefault();

    const { currentTarget: formEl } = event;

    formEl.reset();

    localStorage.removeItem('feedback-form-state');

    formData.email = '';
    formData.message = '';
  }
};

formEl.addEventListener('submit', onFormSubmitFn);
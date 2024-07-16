import { fields, preview } from './formElements.js';

const updatePreview = () => {
  preview.name.textContent = fields.name.value || 'Austin Powers';
  preview.number.textContent = formatCardNumber(fields.number.value) || '0000 0000 0000 0000';
  preview.expiry.textContent = `${fields.mm.value || '00'}/${fields.yy.value || '00'}`;
  preview.cvc.textContent = fields.cvc.value || '000';
};

const validateField = (input, test, errorMessage) => {
  const info = input.closest('label').nextElementSibling;
  if (!test(input.value)) {
    info.textContent = errorMessage;
    info.classList.remove('info--hidden');
    info.classList.add('info--error');
    return false;
  } else {
    info.classList.add('info--hidden');
    info.classList.remove('info--error');
    return true;
  }
};

const formatCardNumber = number => number.replace(/\s?/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');

export { updatePreview, validateField, formatCardNumber };

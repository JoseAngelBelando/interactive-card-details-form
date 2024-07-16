import { fields, form } from './formElements.js';
import { updatePreview, validateField } from './utils.js';

fields.name.addEventListener('input', updatePreview);
fields.number.addEventListener('input', () => {
  fields.number.value = fields.number.value.replace(/\D/g, '').slice(0, 16);
  updatePreview();
});
fields.mm.addEventListener('input', () => {
  fields.mm.value = fields.mm.value.replace(/\D/g, '');
  if (parseInt(fields.mm.value, 10) > 12) {
    fields.mm.value = '12';
  }
  updatePreview();
});
fields.yy.addEventListener('input', () => {
  fields.yy.value = fields.yy.value.replace(/\D/g, '').slice(0, 2);
  updatePreview();
});
fields.cvc.addEventListener('input', () => {
  fields.cvc.value = fields.cvc.value.replace(/\D/g, '').slice(0, 3);
  updatePreview();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  let isValid = true;

  if (!validateField(fields.name, val => val.trim() !== '', 'Cardholder name is required.')) isValid = false;
  if (!validateField(fields.number, val => /^\d{16}$/.test(val), 'Card number must be 16 digits long.'))
    isValid = false;
  if (!validateField(fields.mm, val => /^(0[1-9]|1[0-2])$/.test(val), 'Expiration month is invalid.')) isValid = false;
  if (!validateField(fields.yy, val => /^\d{2}$/.test(val), 'Expiration year is invalid.')) isValid = false;
  if (!validateField(fields.cvc, val => /^\d{3}$/.test(val), 'CVC must be a 3-digit number.')) isValid = false;

  if (isValid) form.submit();
});

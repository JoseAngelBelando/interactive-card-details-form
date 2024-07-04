// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.cardForm');
  const fields = {};
  fields.name = form.querySelector('input[name="name"]');
  fields.number = form.querySelector('input[name="number"]');
  fields.mm = form.querySelector('input[name="mm"]');
  fields.yy = form.querySelector('input[name="yy"]');
  fields.cvc = form.querySelector('input[name="cvc"]');

  const infoElements = form.querySelectorAll('.info');

  const preview = {};
  preview.number = document.querySelector('.card-number');
  preview.name = document.querySelector('.card-name');
  preview.expiry = document.querySelector('.card-expiry');
  preview.cvc = document.querySelector('.card-cvc');

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

  fields.name.addEventListener('input', updatePreview);
  fields.number.addEventListener('input', () => {
    fields.number.value = fields.number.value.replace(/\D/g, '').slice(0, 16);
    updatePreview();
  });
  fields.mm.addEventListener('input', () => {
    fields.mm.value = fields.mm.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (parseInt(fields.mm.value, 10) > 12) {
      fields.mm.value = '12'; // Ensure the value is at most 12
    }
    updatePreview();
  });
  fields.yy.addEventListener('input', () => {
    fields.yy.value = fields.yy.value.replace(/\D/g, '').slice(0, 2); // Only allow two digits
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
    if (!validateField(fields.mm, val => /^(0[1-9]|1[0-2])$/.test(val), 'Expiration month is invalid.'))
      isValid = false;
    if (!validateField(fields.yy, val => /^\d{2}$/.test(val), 'Expiration year is invalid.')) isValid = false;
    if (!validateField(fields.cvc, val => /^\d{3}$/.test(val), 'CVC must be a 3-digit number.')) isValid = false;

    if (isValid) form.submit();
  });

  updatePreview(); // Initialize the preview
});

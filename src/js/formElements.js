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

export { form, fields, infoElements, preview };

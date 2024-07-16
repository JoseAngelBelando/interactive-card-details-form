// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

import './eventListeners.js';
import { updatePreview } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  updatePreview(); // Initialize the preview
});

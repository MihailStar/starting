import { isDevelopment } from './gulp/configuration.js';
import archive from './gulp/tasks/archive.js';
import convertImageToBase64 from './gulp/tasks/base64.js';
import development from './gulp/tasks/development.js';
import generateSprite from './gulp/tasks/sprite.js';
import production from './gulp/tasks/production.js';

export { archive, convertImageToBase64, generateSprite };
export default isDevelopment ? development : production;

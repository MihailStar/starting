import { isDevelopment } from './gulp/configuration.js';
import archiveFiles from './gulp/tasks/archive.js';
import convertImageToBase64 from './gulp/tasks/base64.js';
import deploy from './gulp/tasks/deploy.js';
import development from './gulp/tasks/development.js';
import generateSprite from './gulp/tasks/sprite.js';
import production from './gulp/tasks/production.js';

export { archiveFiles, convertImageToBase64, deploy, generateSprite };
export default (isDevelopment ? development : production);

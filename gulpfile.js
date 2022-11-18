import { isDevelopment } from './gulp/configuration.js';
import { archiveProject } from './gulp/tasks/archive.js';
import { convertImageToBase64 } from './gulp/tasks/base64.js';
import { development } from './gulp/tasks/development.js';
import { production } from './gulp/tasks/production.js';
import { generateSprite } from './gulp/tasks/sprite.js';

export { archiveProject, convertImageToBase64, generateSprite };
export default isDevelopment ? development : production;

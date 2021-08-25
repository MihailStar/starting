import { archive } from './gulp/tasks/archive.mjs';
import { convertImageToBase64 } from './gulp/tasks/base64.mjs';
import { generateSprite } from './gulp/tasks/sprite.mjs';
import { isDevelopment } from './gulp/configuration.mjs';
import { development } from './gulp/tasks/development.mjs';
import { production } from './gulp/tasks/production.mjs';

export { archive, convertImageToBase64, generateSprite };
export default isDevelopment ? development : production;

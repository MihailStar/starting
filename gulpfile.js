import { isDevelopment } from './gulp/configuration';
import archive from './gulp/tasks/archive';
import convertImageToBase64 from './gulp/tasks/base64';
import development from './gulp/tasks/development';
import generateSprite from './gulp/tasks/sprite';
import production from './gulp/tasks/production';

export { archive, convertImageToBase64, generateSprite };
export default isDevelopment ? development : production;

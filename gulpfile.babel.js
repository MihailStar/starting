import {isDevelopment} from './gulp/configuration.js';
import development from './gulp/tasks/development.js';
import imageToBase64 from './gulp/tasks/imageToBase64.js';
import production from './gulp/tasks/production.js';
import sprite from './gulp/tasks/sprite.js';

export {imageToBase64, sprite};
export default isDevelopment ? development : production;
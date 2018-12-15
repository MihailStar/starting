import {directory} from '../configuration.js';
import del from 'del';

function clean() {
  return del(directory.dest);
}

export default clean;
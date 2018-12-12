import {directory} from '../configuration.js';
import del from 'del';

function clear() {
  return del(directory.dest);
}

clear.displayName = 'clear';

export default clear;
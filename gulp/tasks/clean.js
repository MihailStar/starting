/* eslint-disable import/no-extraneous-dependencies */
import del from 'del';
import { directory } from '../configuration.js';

function clean() {
  return del(directory.dest);
}

export default clean;

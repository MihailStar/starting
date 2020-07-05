/* eslint-disable @typescript-eslint/explicit-module-boundary-types, import/no-extraneous-dependencies */
import del from 'del';
import { directory } from '../configuration';

function clean() {
  return del(directory.dest);
}

export default clean;

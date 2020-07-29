/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import del from 'del';
import { directory } from '../configuration';

function clean() {
  return del(directory.dest);
}

export default clean;

/* eslint-disable import/no-extraneous-dependencies */

import del from 'del';

import { directory } from '../configuration.mjs';

function clear() {
  return del(directory.dest);
}

export { clear };

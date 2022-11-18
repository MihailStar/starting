/* eslint-disable import/no-extraneous-dependencies */

import { deleteAsync } from 'del';
import { directory } from '../configuration.js';

function clear() {
  return deleteAsync(directory.dest);
}

export { clear };

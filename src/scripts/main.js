import './utilities';

import '../blocks/icon/icon';
import Counter from '../blocks/counter/counter';

if (window.NodeList !== undefined && NodeList.prototype.forEach === undefined) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

document
  .querySelectorAll('.starting .counter')
  .forEach((counter) => new Counter(counter));

import '../blocks/icon/icon';
import Counter from '../blocks/counter/counter';
import Modal from '../blocks/modal/modal';

if (window.NodeList !== undefined && NodeList.prototype.forEach === undefined) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

document
  .querySelectorAll('.starting .counter')
  .forEach((element) => new Counter(element));

document
  .querySelectorAll('.starting .modal')
  .forEach((element) => new Modal(element));

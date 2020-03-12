import '../blocks/components/icon/icon';
import Counter from '../blocks/components/counter/counter';
import Modal from '../blocks/components/modal/modal';

if (window.NodeList !== undefined && NodeList.prototype.forEach === undefined) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

document
  .querySelectorAll('.starting .counter')
  .forEach((element) => new Counter(element));

document
  .querySelectorAll('.starting .modal')
  .forEach((element) => new Modal(element));

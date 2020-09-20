import MyEventEmitter from '../../../scripts/utilities/event-emitter';

class Modal extends MyEventEmitter {
  constructor(private container: HTMLElement) {
    super();
  }
}

export default Modal;

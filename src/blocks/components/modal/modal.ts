import MyEventEmitter from '../../../scripts/utilities/event-emitter';

class MyModal extends MyEventEmitter {
  constructor(private container: HTMLElement) {
    super();
  }
}

export default MyModal;

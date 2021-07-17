import { EventEmitter as MyEventEmitter } from '../../../scripts/utilities/event-emitter';

class Modal extends MyEventEmitter {
  constructor(private container: HTMLElement) {
    super();
  }
}

export { Modal };

import { EventEmitter as MyEventEmitter } from '../../scripts/utilities/event-emitter';

class Modal extends MyEventEmitter {
  constructor(private readonly container: HTMLElement) {
    super();
  }
}

export { Modal };

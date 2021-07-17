import { EventEmitter as MyEventEmitter } from '../../../scripts/utilities/event-emitter';

class Rating extends MyEventEmitter {
  constructor(container: HTMLElement) {
    super();

    container.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLInputElement) {
        this.emit('event:change', { value: parseInt(target.value, 10) });
      }
    });
  }
}

export { Rating };

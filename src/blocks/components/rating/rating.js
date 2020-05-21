// @flow strict
import MyEventEmitter from '../../../scripts/utilities/event-emitter';

class MyRating extends MyEventEmitter {
  constructor(container /*: HTMLElement */) {
    super();

    container.addEventListener('click', (event /*: Event */) => {
      const { target } = event;

      if (target instanceof HTMLInputElement) {
        this.emit('event:change', { value: parseInt(target.value, 10) });
      }
    });
  }
}

export default MyRating;

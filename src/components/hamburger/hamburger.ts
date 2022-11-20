import { EventEmitter as MyEventEmitter } from '../../scripts/utilities/event-emitter.js';

class Hamburger extends MyEventEmitter<{ pressed: boolean }> {
  private isPressed = false;

  constructor(container: HTMLElement) {
    super();

    this.isPressed = container.getAttribute('aria-pressed') === 'true';

    container.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLButtonElement) {
        this.isPressed = !this.isPressed;

        container.setAttribute('aria-pressed', String(this.isPressed));
        container.classList[this.isPressed ? 'add' : 'remove'](
          `hamburger_pressed`
        );

        this.emit('event:change', { pressed: this.isPressed });
      }
    });
  }
}

export { Hamburger };

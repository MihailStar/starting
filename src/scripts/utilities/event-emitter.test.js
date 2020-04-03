import { strict as assert } from 'assert';
import MyEventEmitter from './event-emitter';

const myEventEmitter = new MyEventEmitter();

/**
 * @param {?Object} data
 * @returns {void}
 */
function logger(data) {
  logger.data = data;
}

let method = 'one';
logger(null);
myEventEmitter.one(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.equal(
  logger.data.type,
  `event:${method}`,
  `MyEventEmitter.${method} test failed`
);
logger(null);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.equal(logger.data, null, `MyEventEmitter.${method} test failed`);

method = 'on';
logger(null);
const off = myEventEmitter.on(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.equal(
  logger.data.type,
  `event:${method}`,
  `MyEventEmitter.${method} test failed`
);
logger(null);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.equal(
  logger.data.type,
  `event:${method}`,
  `MyEventEmitter.${method} test failed`
);
off();
logger(null);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.equal(logger.data, null, `MyEventEmitter.${method} test failed`);

method = 'off';
logger(null);
myEventEmitter.on(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.equal(
  logger.data.type,
  `event:${method}`,
  `MyEventEmitter.${method} test failed`
);
logger(null);
myEventEmitter.off(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.equal(logger.data, null, `MyEventEmitter.${method} test failed`);

process.stdout.write('MyEventEmitter tests passed');

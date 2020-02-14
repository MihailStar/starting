import { strict as assert } from 'assert';
import MyEventEmitter from './my-event-emitter';

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
myEventEmitter.one(`event ${method}`, logger);
myEventEmitter.emit(`event ${method}`, { type: `event ${method}` });
assert.equal(logger.data.type, `event ${method}`, `method ${method}`);
logger(null);
myEventEmitter.emit(`event ${method}`, { type: `event ${method}` });
assert.equal(logger.data, null, `method ${method}`);

method = 'on';
logger(null);
const off = myEventEmitter.on(`event ${method}`, logger);
myEventEmitter.emit(`event ${method}`, { type: `event ${method}` });
assert.equal(logger.data.type, `event ${method}`, `method ${method}`);
logger(null);
myEventEmitter.emit(`event ${method}`, { type: `event ${method}` });
assert.equal(logger.data.type, `event ${method}`, `method ${method}`);
off();
logger(null);
myEventEmitter.emit(`event ${method}`, { type: `event ${method}` });
assert.equal(logger.data, null, `method ${method}`);

method = 'off';
logger(null);
myEventEmitter.on(`event ${method}`, logger);
myEventEmitter.emit(`event ${method}`, { type: `event ${method}` });
assert.equal(logger.data.type, `event ${method}`, `method ${method}`);
logger(null);
myEventEmitter.off(`event ${method}`, logger);
myEventEmitter.emit(`event ${method}`, { type: `event ${method}` });
assert.equal(logger.data, null, `method ${method}`);

process.stdout.write('MyEventEmitter tests passed');

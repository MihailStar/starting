// npx babel-node './src/scripts/utilities/event-emitter.test'
import { strict as assert } from 'assert';
import MyEventEmitter from './event-emitter';

const myEventEmitter = new MyEventEmitter();

function logger(data) {
  logger.data = data;
}

let method = 'one';
logger({});
myEventEmitter.one(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.deepEqual(
  logger.data,
  { type: `event:${method}` },
  `MyEventEmitter.${method} test failed`
);
logger({});
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.deepEqual(logger.data, {}, `MyEventEmitter.${method} test failed`);

method = 'on';
logger({});
const off = myEventEmitter.on(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.deepEqual(
  logger.data,
  { type: `event:${method}` },
  `MyEventEmitter.${method} test failed`
);
logger({});
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.deepEqual(
  logger.data,
  { type: `event:${method}` },
  `MyEventEmitter.${method} test failed`
);
off();
logger({});
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.deepEqual(logger.data, {}, `MyEventEmitter.${method} test failed`);

method = 'off';
logger({});
myEventEmitter.on(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.deepEqual(
  logger.data,
  { type: `event:${method}` },
  `MyEventEmitter.${method} test failed`
);
logger({});
myEventEmitter.off(`event:${method}`, logger);
myEventEmitter.emit(`event:${method}`, { type: `event:${method}` });
assert.deepEqual(logger.data, {}, `MyEventEmitter.${method} test failed`);

process.stdout.write('MyEventEmitter tests passed');

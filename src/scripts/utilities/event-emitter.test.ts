import { strict as assert } from 'assert';
import { EventEmitter as MyEventEmitter } from './event-emitter';

const myEventEmitter = new MyEventEmitter();

interface Logger {
  (data: Record<string, unknown>): void;
  data?: Parameters<Logger>[0];
}

const logger: Logger = (data) => {
  logger.data = data;
};

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

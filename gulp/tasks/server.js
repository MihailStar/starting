import {directory} from '../configuration.js';
import browserSync from 'browser-sync';

const server = browserSync.create('server');

function serverInitialization(done) {
  server.init({
    logPrefix: 'browser-sync',
    notify: false,
    online: false,
    open: false,
    port: 3000,
    reloadOnRestart: true,
    server: directory.dest,
    ui: false
  });
  done();
}

serverInitialization.displayName = 'server initialization';

function serverReload(done) {
  server.reload();
  done();
}

serverReload.displayName = 'server reload';

export {serverInitialization, serverReload};
export default server;
/* eslint-disable import/no-extraneous-dependencies */
import browserSync from 'browser-sync';
import { directory } from '../configuration';

const server = browserSync.create('server');

function initializeServer(done) {
  server.init({
    logPrefix: 'browser-sync',
    notify: false,
    online: false,
    open: false,
    reloadOnRestart: true,
    server: directory.dest,
    ui: false,
  });
  done();
}

function reloadServer(done) {
  server.reload();
  done();
}

export { initializeServer, reloadServer };
export default server;

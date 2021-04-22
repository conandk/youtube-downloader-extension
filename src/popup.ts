import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { App } from './lib/app';
console.log('<----- Extension script started running ----->');

(async () => {
  await new App().render();
})();

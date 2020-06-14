// npx babel-node --extensions .js,.ts --presets @babel/preset-typescript \"./src/blocks/components/keyboard/scheme.test\"
import { strict as assert } from 'assert';
import codes from './codes';
import scheme, { Language } from './scheme';

Object.keys(Language).forEach((key) => {
  assert.deepEqual(
    codes.map((row) => row.length),
    scheme[Language[key]].map((row) => row.length),
    `scheme[Language.${key}] test failed`
  );
});

process.stdout.write('scheme tests passed');

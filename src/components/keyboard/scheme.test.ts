import { strict as assert } from 'assert';
import { Language, scheme } from './scheme';
import { codes } from './codes';

Object.keys(Language).forEach((key) => {
  assert.deepEqual(
    codes.map((row) => row.length),
    scheme[Language[key as keyof typeof Language]].map((row) => row.length),
    `scheme[Language.${key}] test failed`
  );
});

process.stdout.write('scheme tests passed');

import fs from 'fs';
import loader from '@assemblyscript/loader';
import path from 'path';

const imports = { /* imports go here */ };
const wasmModule = loader.instantiateSync(fs.readFileSync(path.join(__dirname, "../build/optimized.wasm")), imports);

const { fib: asFib } = wasmModule.exports as any;

function tsFib(n: number): number {
  let a = 0;
  let b = 1;

  if (n > 0) {
    while (--n) {
      let t = a + b;
      a = b;
      b = t;
    }
    return b;
  }
  return a;
}

const bigNumber = 10000000000; // 100억

const tsStart = Date.now();
tsFib(bigNumber);
const tsEnd = Date.now();
console.log(`ts: ${tsEnd - tsStart}ms`);

const asStart = Date.now();
asFib(bigNumber);
const asEnd = Date.now();
console.log(`as: ${asEnd - asStart}ms`);

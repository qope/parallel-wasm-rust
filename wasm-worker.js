import * as Comlink from "comlink";

function wrapExports({ sum }) {
  return () => {
    const start = performance.now();
    const res = sum(new Int32Array([1, 2, 3, 4]));
    const time = performance.now() - start;
    return {
      res,
      time,
    };
  };
}

async function initHandlers() {
  const multiThread = await import("./pkg/plane_wasm.js");
  await multiThread.default();
  await multiThread.initThreadPool(navigator.hardwareConcurrency);
  return Comlink.proxy(wrapExports(multiThread));
}

Comlink.expose({ handler: initHandlers() });

import * as Comlink from "comlink";

const result = document.getElementById("result");

(async function init() {
  // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
  let handlers = await Comlink.wrap(
    new Worker(new URL("./wasm-worker.js", import.meta.url), {
      type: "module",
    })
  ).handlers;

  // Handlers are named in the same way as buttons.
  let handler = handlers["multiThread"];
  // If handler doesn't exist, it's not supported.

  Object.assign(document.getElementById("multiThread"), {
    async onclick() {
      let { res, time } = await handler();
      console.log(res, time);
    },
    disabled: false,
  });
})();

import * as Comlink from "comlink";

const result = document.getElementById("result");

(async () => {
  // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
  let handler = await Comlink.wrap(
    new Worker(new URL("./wasm-worker.js", import.meta.url), {
      type: "module",
    })
  ).handler;

  Object.assign(document.getElementById("multiThread"), {
    async onclick() {
      let { res, time } = await handler();
      console.log(res, time);
    },
    disabled: false,
  });
})();

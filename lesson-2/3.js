const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

const handler = (payload) => {
  console.log(payload);
};

eventEmitter.on("start", handler);

eventEmitter.emit("start", "App started 1");

eventEmitter.removeAllListeners("start");

eventEmitter.emit("start", "App started 2");

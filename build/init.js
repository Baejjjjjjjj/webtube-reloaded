"use strict";

require("regenerator-runtime");
require("dotenv/config");
require("./db");
require("./models/Video");
require("./models/User");
require("./models/Comment");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//파일 자체를 import한다.

var haldleListening = function haldleListening() {
  return console.log("server listening on port 3000");
};
_server["default"].listen(4000, haldleListening);
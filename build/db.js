"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].set('strictQuery', true);
_mongoose["default"].connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = _mongoose["default"].connection;
var handlerOpen = function handlerOpen() {
  console.log("db is connection!!");
};
db.on("err", function (err) {
  return console.log("db error", err);
});
db.once("open", handlerOpen);
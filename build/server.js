"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _middlewares = require("./middlewares");
var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
console.log(process.env.DB_URL);
console.log(process.env.COOKIE_SECRET);
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    masZge: 20000
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use((0, _expressFlash["default"])());
app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(_middlewares.localMiddleware);
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/videos", _videoRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/", _globalRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var apiRouter = _express["default"].Router();
apiRouter.post("/videos/:id/view", _videoController.registerView);
apiRouter.post("/videos/:id/comment", _videoController.createComment);
var _default = apiRouter;
exports["default"] = _default;
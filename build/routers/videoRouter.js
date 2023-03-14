"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoRouter = _express["default"].Router();
videoRouter.get("/:id([0-9a-f]{24})", _videoController.watch);
videoRouter.route('/:id([0-9a-f]{24})/edit').all(_middlewares.protectMiddleware).get(_videoController.getEdit).post(_videoController.postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", _middlewares.protectMiddleware, _videoController.deleteVideo);
videoRouter.route("/upload").all(_middlewares.protectMiddleware).get(_videoController.getUpload).post(_middlewares.videoUpload.fields([{
  name: "video"
}, {
  name: "thumb"
}]), _videoController.postUpload);
var _default = videoRouter;
exports["default"] = _default;
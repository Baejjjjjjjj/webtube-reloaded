"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.route("/edit").all(_middlewares.protectMiddleware).get(_userController.getEdit).post(_middlewares.avatarUpload.single("avatar"), _userController.postEdit);
userRouter.get("/delete", _userController.remove);
userRouter.get("/github/start", _middlewares.publicOnlyMiddleware, _userController.startGithubLogin);
userRouter.get("/github/callback", _middlewares.publicOnlyMiddleware, _userController.finishGithubLogin);
userRouter.get("/logout", _middlewares.protectMiddleware, _userController.logout);
userRouter.route("/change-password").all(_middlewares.protectMiddleware).get(_userController.getChangePawword).post(_userController.postChangePawword);
userRouter.get("/:id", _userController.see);
var _default = userRouter;
exports["default"] = _default;
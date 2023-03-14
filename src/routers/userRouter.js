import express from "express";
import {postEdit,finishGithubLogin,startGithubLogin, getEdit,remove,see,logout, getChangePawword, postChangePawword} from "../controllers/userController"
import {protectMiddleware,publicOnlyMiddleware,avatarUpload} from "../middlewares"
const userRouter = express.Router();


userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(avatarUpload.single("avatar"),postEdit);
userRouter.get("/delete",remove);

userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin)
userRouter.get("/github/callback",publicOnlyMiddleware,finishGithubLogin)
userRouter.get("/logout",protectMiddleware,logout);
userRouter.route("/change-password").all(protectMiddleware).get(getChangePawword).post(postChangePawword)
userRouter.get("/:id",see);
export default userRouter;
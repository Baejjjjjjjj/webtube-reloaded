import express from "express";
import {handleJoin} from "../controllers/globalController";
import {postlogin, getlogin,getJoin,postJoin} from "../controllers/userController";
import { home,search } from "../controllers/videoController";
const rootRouter = express.Router();



rootRouter.get("/",home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getlogin).post(postlogin);
rootRouter.get('/search',search);
export default rootRouter;
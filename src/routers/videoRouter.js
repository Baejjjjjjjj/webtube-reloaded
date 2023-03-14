import express from "express";
import {getEdit,postEdit,watch,upload,deleteVideo, getUpload, postUpload} from "../controllers/videoController"
import {videoUpload,protectMiddleware} from "../middlewares";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route('/:id([0-9a-f]{24})/edit').all(protectMiddleware).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete",protectMiddleware,deleteVideo);
videoRouter.route("/upload").all(protectMiddleware).get(getUpload).post(videoUpload.fields([
    {name:"video"},{name:"thumb"}
]),postUpload);


export default videoRouter;
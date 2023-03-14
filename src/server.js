import express from "express"
import MongoStore from "connect-mongo"
import rootRouter from "./routers/globalRouter"
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session"
import {localMiddleware} from "./middlewares"
import apiRouter from "./routers/apiRouter";
import flash from "express-flash"
const app = express();
app.set("view engine","pug")
app.set("views",process.cwd()+"/src/views");


app.use(express.urlencoded({extended:true}))
app.use(express.json());
console.log(process.env.DB_URL)
console.log(process.env.COOKIE_SECRET)
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        masZge:20000,
    },
    store:MongoStore.create({mongoUrl:process.env.DB_URL}),
}))
app.use(flash());
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
    });

app.use(localMiddleware);

app.use("/uploads",express.static("uploads"))

app.use("/static", express.static("assets"));

app.use("/videos",videoRouter);
app.use("/users",userRouter);
app.use("/",rootRouter);
app.use("/api",apiRouter)




export default app;

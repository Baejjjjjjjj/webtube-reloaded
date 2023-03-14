import "regenerator-runtime"
import "dotenv/config"
import "./db"; //파일 자체를 import한다.
import "./models/Video";
import "./models/User";
import "./models/Comment"
import app from "./server";

const PORT = process.env.PORT || 4000;
const haldleListening = ()=> console.log("server listening on port 3000")
app.listen(4000,haldleListening);
import mongoose from "mongoose";
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const db = mongoose.connection;
const handlerOpen = () =>{
    console.log("db is connection!!")
}
db.on("err",(err)=>console.log("db error",err));
db.once("open",handlerOpen);
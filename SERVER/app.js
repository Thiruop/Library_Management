const express=require("express");
const mongoose=require("./models/db")
const { Book, Member }=require("./models/schema")
const lib=require("./routers/library")
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors({ origin: "*" }));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   next();
   })
app.use("/",lib);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
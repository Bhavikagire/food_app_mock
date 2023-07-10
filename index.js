const express = require("express")
const mongoose = require("mongoose")


const dotenv = require("dotenv")
dotenv.config()


const PORT = process.env.PORT

const app = express()
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to my Food delivery App")
})
app.use("/api", require("./routes/Auth"))
// app.use("/rest", require("./routes/Restaurant"))

mongoose.connect(process.env.mongoURL)
.then(() => {
    console.log("connected to db")
    app.listen(process.env.PORT, ()=>{
    
        console.log("app is running at", PORT)
    })
})
.catch((err)=>{
    console.log("error in connection in mongo",err)
})


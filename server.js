const express = require("express");
const cors = require("cors");

const app = express();


//PORT
const port = process.env.PORT || 5000

//DB Connection
require("./config/db")

//Require Routes
const bookRoutes = require("./routes/bookRoutes");

//MiddleWare
app.use(express.json())

app.use(cors());

app.get("/", (req, res)=> {
    res.send("hello!")
})

//Routes
app.use("/api/books", bookRoutes)

app.listen(port, ()=>{
    console.log(`Server is running at PORT: ${port}`);
})

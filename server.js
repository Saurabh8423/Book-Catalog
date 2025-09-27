require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const errorHandler = require('./middleware/errorMiddleware');

//MiddleWare
app.use(express.json())
app.use(cors());

// Connect DB
connectDB();

// ✅ Routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);


//PORT
const port = process.env.PORT || 5000

// app.get("/", (req, res)=> {
//     res.send("hello!")
// })

// error handling (last)
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running at PORT: ${port}`);
})

require('dotenv').config();
const express = require("express");
const helmet = require('helmet');
const cors = require("cors");
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const errorHandler = require('./middleware/errorMiddleware');

// Connect DB
connectDB();

//MiddleWare
app.use(helmet());
app.use(express.json())
app.use(cors());
app.use(morgan('dev'));


// rate limiter (simple)
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

//  Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);


//PORT
const port = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running..." });
});

// error handling (last)
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running at PORT: ${port}`);
})

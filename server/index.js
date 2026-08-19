const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors")

app.use(express.json());    // json parser || MIDDLEWARE

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}));

// creating the admin & user routes
const adminRouter = require('./router/adminRoutes');
const userRouter = require('./router/userRoutes');

// connecting to DB
const {ConnectDb, prisma} =  require('./utils/dbConnector');
ConnectDb();


app.get('/', (req, res) => {
  res.send('Welcome to the Movie API');
});

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);


//app.use(express.urlencoded({ extended: true }));


// importing and running the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.DEV_URL}:${process.env.PORT}`);
});

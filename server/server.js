require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001
const authRoute = require('./routes/auth');
const movieRoute = require('./routes/movies');
const userRoute = require('./routes/users');
const listRoute = require('./routes/lists');


app.use(express.json())
app.use('/api', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/user', userRoute);
app.use('/api/lists', listRoute);


mongoose
  .connect(process.env.Mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB...."))
  .catch((err) => console.log(err));

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
});
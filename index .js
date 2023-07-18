const express = require("express")
const app = express()
const PORT = 3000

const {dbConnection} = require("./config/config")
const { handleTypeError }= require('./middlewares/errors');

app.use(express.json());

dbConnection();

app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));
app.use('/users', require('./routes/users'));

app.use(handleTypeError)


app.listen(PORT, () => console.log("Server started on port " + PORT));

module.exports = app;
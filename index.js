const express = require("express");
const cors = require("cors")

const app = express();
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { dbConnection } = require("./config/config");
const { handleTypeError } = require("./middlewares/errors");

app.use(express.json());
app.use(express.static("./assets"));

dbConnection();

app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/users", require("./routes/users"));

app.use(handleTypeError);

app.listen(PORT, () => console.log("Server started on port " + PORT));

module.exports = app;

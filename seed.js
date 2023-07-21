const mongoose = require("mongoose");
const User = require("./models/user.js");
const Post = require("./models/post.js");
const Comment = require("./models/comment.js");
const bcrypt = require("bcryptjs");

// Conecta a la base de datos
mongoose
  .connect(
    "mongodb+srv://adrianramirezgalera:adrian1234@cluster0.hmghsi0.mongodb.net/socialnetwork",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexión exitosa a la base de datos");

    // Datos iniciales que deseas insertar
    const initialUsers = [
      {
        username: "Adrian",
        email: "adrian@example.com",
        password: bcrypt.hashSync("adrian1234", 10),
        confirmed: true,
      },
      {
        username: "Ramon",
        email: "ramon@example.com",
        password: bcrypt.hashSync("ramon1234", 10),
        confirmed: true,
      },
      {
        username: "lucas",
        email: "lucas@example.com",
        password: bcrypt.hashSync("lucas1234", 10),
        confirmed: true,
      },
      {
        username: "patricia",
        email: "patricia@example.com",
        password: bcrypt.hashSync("patricia1234", 10),
        confirmed: true,
      },
      {
        username: "jaime",
        email: "jaime@example.com",
        password: bcrypt.hashSync("jaime1234", 10),
        confirmed: true,
      },
      {
        username: "clotilda",
        email: "clotilda@example.com",
        password: bcrypt.hashSync("clotilda1234", 10),
        confirmed: true,
      },
      {
        username: "ramona",
        email: "ramona@example.com",
        password: bcrypt.hashSync("ramona1234", 10),
        confirmed: true,
      },
      {
        username: "paco",
        email: "paco@example.com",
        password: bcrypt.hashSync("paco1234", 10),
        confirmed: true,
      },
      {
        username: "maria",
        email: "maria@example.com",
        password: bcrypt.hashSync("maria1234", 10),
        confirmed: true,
      },
      {
        username: "vicente",
        email: "vicente@example.com",
        password: bcrypt.hashSync("vicente1234", 10),
        confirmed: true,
      },
    ];

    const initialPosts = [
      {
        title: "París",
        body: "Me encata París",
      },
      {
        title: "Madrid",
        body: "Me encata Madrid",
      },
      {
        title: "Roma",
        body: "Me encata Roma",
      },
      {
        title: "Escocia",
        body: "Me encata Escocia",
      },
      {
        title: "Bilbao",
        body: "Me encata Bilbao",
      },
      {
        title: "Sevilla",
        body: "Me encata Sevilla",
      },
      {
        title: "Venecia",
        body: "Me encata Venecia",
      },
      {
        title: "Londres",
        body: "Me encata Londres",
      },
      {
        title: "Toronto",
        body: "Me encata Toronto",
      },
      {
        title: "MongoDB",
        body: "Me encata MongoDB",
      },
    ];

    const initialComments = [
      {
        title: "Hola",
        body: "Amí también me gusta París",
      },
      {
        title: "Hola",
        body: "Amí también me gusta Madrid",
      },
      {
        title: "Hola",
        body: "Amí también me gusta Bilbao",
      },
      {
        title: "Hola",
        body: "Amí también me gusta Sevilla",
      },
      {
        title: "Hola",
        body: "Amí también me gusta París",
      },
      {
        title: "Hola",
        body: "Amí también me gusta Valladolid",
      },
      {
        title: "Hola",
        body: "Amí también me gusta Roma",
      },
      {
        title: "Hola",
        body: "Amí también me gusta Venecia",
      },
      {
        title: "Hola",
        body: "Amí también me gusta nadar",
      },
      {
        title: "Hola",
        body: "Amí también me gusta pintar",
      },
    ];

    // Inserta los datos iniciales en la base de datos
    Promise.all([
      User.insertMany(initialUsers),
      Post.insertMany(initialPosts),
      Comment.insertMany(initialComments),
    ])
      .then(() => {
        console.log("Data inserted correctly");
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error("Error connecting database:", error);
  });

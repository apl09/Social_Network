const request = require("supertest");
const app = require("../index ");
const Post = require("../models/Post");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

describe("testing/users", () => {
  const post = {
    title: "Testing",
    body: "this is a test",
  };

  afterAll(async () => {
    return await Post.deleteMany({}); // Cambiar esto y que sólo me borre el de testing
  });

  // Para crear el post debo de estar conectado con un token
  test("Create a post", async () => {
    const res = await request(app)
      .post("/posts/create")
      .send(post)
      .expect(201);
    const sendPost = {
      ...post,
      _id: res.body.post._id,

    };

    const newPost = res.body.post;
    expect(newPost).toEqual(sendPost);
  });
});

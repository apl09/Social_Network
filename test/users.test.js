const request = require("supertest");
const app = require("../index ");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

describe("testing/users", () => {
  const user = {
    username: "Testing",
    email: "testing@test.com",
    password: "test1234",
  };

  // afterAll(async () => {
  //   return await User.deleteMany({}); // Cambiar esto y que sólo me borre el de testing
  // });
  afterAll(async () => {
    return await User.findByIdAndDelete(newUser._id); // Cambiar esto y que sólo me borre el de testing
  });

  test("Create a user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send(user)
      .expect(201);
    const sendUser = {
      ...user,
      _id: res.body.user._id,
      password: res.body.user.password,
      createdAt: res.body.user.createdAt,
      updatedAt: res.body.user.updatedAt,
      postIds: res.body.user.postIds,
      commentIds: res.body.user.commentIds,
      role: res.body.user.role,
      tokens: res.body.user.tokens,
      followers: [],
      __v: 0,
      confirmed: res.body.user.confirmed,
    };

    const newUser = res.body.user;
    expect(newUser).toEqual(sendUser);
  });

  let newUser;

  test("Confirm a user", async () => {
    const emailToken = jwt.sign({ email: user.email }, jwt_secret, {
      expiresIn: "48h",
    });
    const res = await request(app)
      .get("/users/confirm/" + emailToken)
      .expect(201);
    expect(res.text).toBe("User successfully confirmed");
  });

  // Me da error a la hora de confirmar usuario, no se si es culpa del de arriba o el siguiente
  test("Login a user", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: "testing@test.com", password: "test1234" })
      .expect(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
  let token;
});

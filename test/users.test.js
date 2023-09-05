const request = require("supertest");
const app = require("../index");
const User = require("../models/user");

describe("testing/users", () => {
  const user = {
    username: "Testing",
    email: "testing@test.com",
    password: "test1234"
  };

  afterAll(async () => {
    return await User.deleteOne({ email: "testing@test.com" });
  });

  test("Create a user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send(user)
      .expect(201);

    expect(res.body.user._id).toBeDefined();
    expect(res.body.user.email).toBeDefined();
    expect(res.body.user.username).toBeDefined();
  });

  test("Confirm a user", async () => {
    const res = await request(app)
      .get("/users/confirm/testing@test.com")
      .expect(201);

    expect(res.text).toBe("User successfully confirmed");
  });

  let token;

  test("Login a user", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: "testing@test.com", password: "test1234" })
      .expect(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
});

const request = require("supertest");
const app = require("../index ");
const Comment = require("../models/comment");

describe("testing/users", () => {
  const comment = {
    title: "Testing",
    body: "this is a test",
  };

  afterAll(async () => {
    return await Comment.deleteOne({ title: "Testing" });
  });

  let token;

  test("Login a user", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: "testing2@test.com", password: "test1234" })
      .expect(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test("Create a comment", async () => {
    const res = await request(app)
      .post("/comments/create")
      .send(comment)
      .set({ Authorization: token })
      .expect(201);

    expect(res.body.comment._id).toBeDefined();
    expect(res.body.comment.userId).toBeDefined();
  });
});

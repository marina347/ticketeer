const app = require("../src/app");
const request = require("supertest");
const User = require("../src/models/user");
const {
  userOne,
  userOneId,
  setupDatabase,
  tokenOfUserThatIsNotInDb,
} = require("./common-data/data");

beforeEach(setupDatabase);

test("Should login user", async () => {
  const response = await request(app)
    .post("/users/googleAuth")
    .send({
      googleToken: "111111",
    })
    .expect(200);
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test("Should logout not logged in user and delete token", async () => {
  await request(app)
    .post("/users/logout")
    .set("Authorization", `Bearer ${tokenOfUserThatIsNotInDb}`)
    .expect(401);
});

test("Should logout logged in user and delete token", async () => {
  const response = await request(app)
    .post("/users/logout")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.tokens).toHaveLength(0);
});

test("Should logout logged in user and delete token", async () => {
  await request(app).post("/users/logout").expect(401);
});

test("Should logout logged in user and delete all tokens", async () => {
  await request(app)
    .post("/users/logoutAll")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.tokens).toHaveLength(0);
});

test("Should logout logged in user and delete all tokens unauthorized", async () => {
  await request(app).post("/users/logoutAll").expect(401);
});

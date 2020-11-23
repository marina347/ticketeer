const app = require("../src/app");
const request = require("supertest");
const crypto = require("crypto-js");
const User = require("../src/models/user");
const {
  userOne,
  setupDatabase,
  boardOne,
  boardTwo,
  userThree,
  boardIdWhichIsNotInDb,
} = require("./common-data/data");
const Board = require("../src/models/board");

beforeEach(setupDatabase);

test("Should create board for user", async () => {
  const response = await request(app)
    .post("/boards")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Test board",
      description: "Test description",
    })
    .expect(200);
  const board = await Board.findById(response.body._id);
  expect(board).not.toBeNull();
  expect(board.creator).toEqual(userOne._id);
});

test("Should create board for unauthorized user", async () => {
  await request(app)
    .post("/boards")
    .send({
      name: "Test board",
      description: "Test description",
    })
    .expect(401);
});

test("Should get boards of user", async () => {
  const response = await request(app)
    .get("/boards")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  expect(response.body.boards).not.toBeNull();
});

test("Should get no boards of user", async () => {
  const response = await request(app)
    .get("/boards")
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .expect(404);
});

test("Should get boards of unauthorized user", async () => {
  await request(app).get("/boards").expect(401);
});

test("Should delete board of user", async () => {
  await request(app)
    .delete(`/boards/${boardOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  const board = await Board.findById(boardOne._id);
  expect(board).toBeNull();
});

test("Should delete board of user given with unvalid path param", async () => {
  await request(app)
    .delete("/boards/testtt")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(500);
});

test("Should delete board of another user", async () => {
  await request(app)
    .delete(`/boards/${boardTwo._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(404);
});

test("Should delete board of unauthorized user", async () => {
  await request(app).delete(`/boards/${boardOne._id}`).expect(401);
});

test("Should get members of board where user is member", async () => {
  const response = await request(app)
    .get(`/boards/${boardOne._id}/members`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  expect(response.body.members).toHaveLength(1);
});

test("Should get members of board where user is not member", async () => {
  const response = await request(app)
    .get(`/boards/${boardTwo._id}/members`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(404);
});

test("Should get members of board provided with not valid path param", async () => {
  await request(app)
    .get(`/boards/test/members`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(500);
});

test("Should get members of board where unathorized user is member", async () => {
  const response = await request(app)
    .get(`/boards/${boardTwo._id}/members`)
    .expect(401);
});

test("Should edit board name where user is creator", async () => {
  const response = await request(app)
    .patch(`/boards/${boardOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Changed name of board 1" })
    .expect(200);
  const board = await Board.findById(boardOne._id);
  expect(board.name).toEqual(response.body.name);
});

test("Should edit board name where user is creator with unvalid path param", async () => {
  const response = await request(app)
    .patch(`/boards/testBoardId`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Changed name of board 1" })
    .expect(500);
});

test("Should edit board unvalid prop where user is creator", async () => {
  await request(app)
    .patch(`/boards/${boardOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "Location" })
    .expect(400);
});

test("Should edit board name where user is not creator", async () => {
  await request(app)
    .patch(`/boards/${boardOne._id}`)
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .send({ name: "Test name" })
    .expect(404);
});

test("Should encode board id", async () => {
  const response = await request(app)
    .get(`/boards/make-invite/${boardOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  var decodedBoardId = decodeURIComponent(response.body.hashedBoardId);
  var originalBoardId = crypto.AES.decrypt(
    decodedBoardId,
    "my_crypto_key"
  ).toString(crypto.enc.Utf8);
  expect(boardOne._id.toString()).toEqual(originalBoardId);
});

test("Should encode board id unathorized", async () => {
  const response = await request(app)
    .get(`/boards/make-invite/${boardOne._id}`)
    .expect(401);
});

test("Should decode encoded board id", async () => {
  const hashedBoardId = encodeURIComponent(
    crypto.AES.encrypt(boardOne._id.toString(), "my_crypto_key").toString()
  );
  await request(app)
    .get(`/boards/join-board/${hashedBoardId}`)
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .expect(200);

  const board = await Board.findById(boardOne._id);
  expect(board.members).toHaveLength(2);
});

test("Should decode encoded board id with unvalid path param", async () => {
  const hashedBoardId = encodeURIComponent(
    crypto.AES.encrypt("testBoard", "my_crypto_key").toString()
  );
  await request(app)
    .get(`/boards/join-board/${hashedBoardId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(500);
});

test("Should decode encoded board id unauthorized", async () => {
  const hashedBoardId = encodeURIComponent(
    crypto.AES.encrypt(boardOne._id.toString(), "my_crypto_key").toString()
  );
  await request(app).get(`/boards/join-board/${hashedBoardId}`).expect(401);
});

test("Should decode encoded non existing board id", async () => {
  const hashedBoardId = encodeURIComponent(
    crypto.AES.encrypt(
      boardIdWhichIsNotInDb.toString(),
      "my_crypto_key"
    ).toString()
  );
  await request(app)
    .get(`/boards/join-board/${hashedBoardId}`)
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .expect(404);
});

test("Should decode encoded existing board id two times", async () => {
  const hashedBoardId = encodeURIComponent(
    crypto.AES.encrypt(boardOne._id.toString(), "my_crypto_key").toString()
  );
  await request(app)
    .get(`/boards/join-board/${hashedBoardId}`)
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .expect(200);

  await request(app)
    .get(`/boards/join-board/${hashedBoardId}`)
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .expect(400);
});

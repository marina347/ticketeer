const app = require("../src/app");
const request = require("supertest");
const Lane = require("../src/models/lane");
const {
  userOne,
  setupDatabase,
  boardOne,
  userThree,
  userTwo,
  laneOne,
  idWhichIsNotInDb,
} = require("./common-data/data");

beforeEach(setupDatabase);

test("Should add lane to board", async () => {
  const response = await request(app)
    .post("/lanes")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Test lane",
      boardId: boardOne._id,
    })
    .expect(200);
  const lane = await Lane.findById(response.body.lane._id);
  expect(lane).not.toBeNull();
});

test("Should add lane to board you are not member of", async () => {
  await request(app)
    .post("/lanes")
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .send({
      name: "Test lane 1",
      boardId: boardOne._id,
    })
    .expect(500);
});

test("Should add lane to board unauthorized", async () => {
  await request(app)
    .post("/lanes")
    .send({
      name: "Test lane",
      boardId: boardOne._id,
    })
    .expect(401);
});

test("Should get lanes of board", async () => {
  const response = await request(app)
    .get(`/lanes/${boardOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  expect(response.body.lanes).toHaveLength(2);
});

test("Should get lanes of board unauthorized", async () => {
  await request(app).get(`/lanes/${boardOne._id}`).expect(401);
});

test("Should get lanes of board you are not member", async () => {
  await request(app)
    .get(`/lanes/${boardOne._id}`)
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .expect(500);
});

test("Should delete lane", async () => {
  await request(app)
    .delete(`/lanes/${laneOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  const lane = await Lane.findById(laneOne._id);
  expect(lane).toBeNull();
});

test("Should delete lane unathorized", async () => {
  await request(app).delete(`/lanes/${laneOne._id}`).expect(401);
});

test("Should delete lane of board user is not member of", async () => {
  await request(app)
    .delete(`/lanes/${laneOne._id}`)
    .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
    .expect(500);
});

test("Should delete not existing lane", async () => {
  await request(app)
    .delete(`/lanes/${idWhichIsNotInDb}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(404);
});

test("Should update lane with property name", async () => {
  const response = await request(app)
    .patch(`/lanes/${laneOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Changed test name",
    })
    .expect(200);
  const lane = await Lane.findById(laneOne._id);
  expect(lane.name).toEqual(response.body.name);
});

test("Should update lane with unvalid property", async () => {
  await request(app)
    .patch(`/lanes/${laneOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Location 1",
    })
    .expect(400);
});

test("Should updat non existing lane", async () => {
  await request(app)
    .patch(`/lanes/${idWhichIsNotInDb}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Test name",
    })
    .expect(404);
});

test("Should update lane unauthorized", async () => {
  await request(app)
    .patch(`/lanes/${laneOne._id}`)
    .send({
      name: "Test name",
    })
    .expect(401);
});

test("Should update lane of board which user is not member of", async () => {
  await request(app)
    .patch(`/lanes/${laneOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send({
      name: "Test name",
    })
    .expect(500);
});

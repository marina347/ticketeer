const app = require("../src/app");
const request = require("supertest");
const Ticket = require("../src/models/ticket");
const {
  userOne,
  setupDatabase,
  boardOne,
  userTwo,
  laneOne,
  idWhichIsNotInDb,
  ticketOne,
} = require("./common-data/data");

beforeEach(setupDatabase);

test("Should add ticket to lane", async () => {
  const response = await request(app)
    .post("/tickets")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Test ticket",
      laneId: laneOne._id,
    })
    .expect(200);
  const ticket = await Ticket.findById(response.body.ticket._id);
  expect(ticket).not.toBeNull();
});

test("Should add ticket to lane unauthorized", async () => {
  await request(app)
    .post("/tickets")
    .send({
      name: "Test ticket",
      laneId: laneOne._id,
    })
    .expect(401);
});

test("Should add ticket to lane with unvalid lane id", async () => {
  await request(app)
    .post("/tickets")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Test ticket",
      laneId: "test123",
    })
    .expect(500);
});

test("Should get tickets from board", async () => {
  const response = await request(app)
    .get(`/tickets/${boardOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  expect(response.body).toHaveLength(3);
});

test("Should get tickets from board unauthorized", async () => {
  await request(app).get(`/tickets/${boardOne._id}`).expect(401);
});

test("Should get tickets from board where user is not member", async () => {
  await request(app)
    .get(`/tickets/${boardOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .expect(500);
});

test("Should delete ticket", async () => {
  await request(app)
    .delete(`/tickets/${ticketOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  const ticket = await Ticket.findById(ticketOne._id);
  expect(ticket).toBeNull();
});

test("Should delete ticket unauthorized", async () => {
  await request(app).delete(`/tickets/${ticketOne._id}`).expect(401);
});

test("Should delete non existing ticket", async () => {
  await request(app)
    .delete(`/tickets/${idWhichIsNotInDb}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(404);
});

test("Should delete ticket with unvalid path param", async () => {
  await request(app)
    .delete(`/tickets/test123`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(500);
});

test("Should update ticket name and assigners property", async () => {
  const response = await request(app)
    .patch(`/tickets/${ticketOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Test ticket name",
      assigners: [{ assigner: userOne }],
    })
    .expect(200);
  const ticket = await Ticket.findById(ticketOne._id);
  expect(ticket.name).toEqual(response.body.ticket.name);
  expect(ticket.assigners).toHaveLength(1);
});

test("Should update ticket name and assigners property unathorized", async () => {
  await request(app)
    .patch(`/tickets/${ticketOne._id}`)
    .send({
      name: "Test ticket name",
      assigners: [{ assigner: userOne }],
    })
    .expect(401);
});

test("Should update ticket unvalid property", async () => {
  await request(app)
    .patch(`/tickets/${ticketOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Location 1",
    })
    .expect(400);
});

test("Should update non existing ticket with property name", async () => {
  await request(app)
    .patch(`/tickets/${idWhichIsNotInDb}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Name 1",
    })
    .expect(404);
});

test("Should update ticket with unvalid path param", async () => {
  await request(app)
    .patch(`/tickets/test123`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Name 1",
    })
    .expect(500);
});

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Board = require("../../src/models/board");
const Lane = require("../../src/models/lane");
const Ticket = require("../../src/models/ticket");
const config = require("../../config");

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();
const idWhichIsNotInDb = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  sub: "463656546456",
  email: "jackwilson@gmail.com",
  name: "Jack Wilson",
  lastLogin: new Date(),
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, config.JWT_SECRET),
    },
  ],
};

const userTwo = {
  _id: userTwoId,
  sub: "69876878768",
  email: "annblack@gmail.com",
  name: "Ann Black",
  lastLogin: new Date(),
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, config.JWT_SECRET),
    },
  ],
};

const userThree = {
  _id: userThreeId,
  sub: "07667887876",
  email: "tedcollins@gmail.com",
  name: "Ted Collins",
  lastLogin: new Date(),
  tokens: [
    {
      token: jwt.sign({ _id: userThreeId }, config.JWT_SECRET),
    },
  ],
};

const boardOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Board 1",
  description: "Description 1",
  creator: userOneId,
  members: [{ member: userOneId }],
};

const boardTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: "Board 2",
  description: "Description 2",
  creator: userTwoId,
  members: [{ member: userTwoId }],
};

const laneOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Lane 1",
  boardId: boardOne._id,
};

const laneTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: "Lane 2",
  boardId: boardOne._id,
};

const ticketOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Ticket 1",
  description: "Description 1",
  createDate: new Date(),
  laneId: laneOne._id,
  tags: [{ tag: "Tag1" }, { tag: "Tag2" }],
};

const ticketTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: "Ticket 2",
  description: "Description 2",
  createDate: new Date(),
  laneId: laneOne._id,
  tags: [{ tag: "Tag1" }],
};

const ticketThree = {
  _id: new mongoose.Types.ObjectId(),
  name: "Ticket 3",
  description: "Description 3",
  createDate: new Date(),
  assigners: [{ assigner: userTwo._id }],
  laneId: laneTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Board.deleteMany();
  await Lane.deleteMany();
  await Ticket.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
  await new Board(boardOne).save();
  await new Board(boardTwo).save();
  await new Lane(laneOne).save();
  await new Lane(laneTwo).save();
  await new Ticket(ticketOne).save();
  await new Ticket(ticketTwo).save();
  await new Ticket(ticketThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  boardOne,
  boardTwo,
  userThree,
  laneOne,
  laneTwo,
  ticketOne,
  ticketTwo,
  ticketThree,
  idWhichIsNotInDb,
  setupDatabase,
};

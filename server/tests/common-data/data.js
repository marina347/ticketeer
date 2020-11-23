const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Board = require("../../src/models/board");

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();
const boardIdWhichIsNotInDb = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  sub: "123fggggg",
  email: "marinabulic1@gmail.com",
  name: "Marina Bulic",
  lastLogin: new Date(),
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, "my_mega_secret"),
    },
  ],
};

const userTwo = {
  _id: userTwoId,
  sub: "sssss43546",
  email: "marinabulic@gmail.com",
  name: "Marina Bulic",
  lastLogin: new Date(),
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, "my_mega_secret"),
    },
  ],
};

const userThree = {
  _id: userThreeId,
  sub: "07667887876",
  email: "marinacivcija@gmail.com",
  name: "Marina Civcija",
  lastLogin: new Date(),
  tokens: [
    {
      token: jwt.sign({ _id: userThreeId }, "my_mega_secret"),
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

const setupDatabase = async () => {
  await User.deleteMany();
  await Board.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
  await new Board(boardOne).save();
  await new Board(boardTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  boardOne,
  boardTwo,
  userThree,
  boardIdWhichIsNotInDb,
  setupDatabase,
};

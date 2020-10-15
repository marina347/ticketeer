const mongoose = require("mongoose");
const express = require("express");

const Board = require("../models/board");

const checkIfValueExistsInDatabase = async (model, id) => {
  try {
    const modelFromDatabase = await model.findOne({ _id: id });
    if (!modelFromDatabase) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(
      `FK Constraint 'checkObjectExists' for '${id.toString()}' failed`
    );
  }
};

const isUserMemberOfBoard = async (model, userId, boardId) => {
  try {
    const board = await model.findOne({
      _id: boardId,
      "members.member": userId,
    });
    if (!board) {
      throw new Error("User is not member of the board");
    }
  } catch (error) {
    throw new Error("User is not member of the board");
  }
};
module.exports = { checkIfValueExistsInDatabase, isUserMemberOfBoard };

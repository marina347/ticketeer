const mongoose = require("mongoose");

const fkHelper = require("../utils/FKHelper");
const Lane = require("../models/lane");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    validate: {
      async validator(value) {
        return await fkHelper.checkIfValueExistsInDatabase(
          mongoose.model("User"),
          value
        );
      },
      message: "User does not exists",
    },
  },
  members: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        validate: {
          async validator(value) {
            return await fkHelper.checkIfValueExistsInDatabase(
              mongoose.model("User"),
              value
            );
          },
          message: "User does not exists",
        },
      },
    },
  ],
});

boardSchema.virtual("lanes", {
  ref: "Lane",
  localField: "_id",
  foreignField: "boardId",
});

boardSchema.pre("findOneAndDelete", async function (next) {
  const board = this;
  await Lane.deleteMany({ boardId: board._conditions._id });
  next();
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;

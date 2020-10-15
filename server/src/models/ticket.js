const mongoose = require("mongoose");

const fkHelper = require("../utils/FKHelper");

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  createDate: {
    type: Date,
    required: true,
  },
  assigners: [
    {
      assigner: {
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
  laneId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Lane",
    validate: {
      async validator(value) {
        return await fkHelper.checkIfValueExistsInDatabase(
          mongoose.model("Lane"),
          value
        );
      },
      message: "Lane does not exists",
    },
  },
  tags: [
    {
      tag: {
        type: String,
      },
    },
  ],
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

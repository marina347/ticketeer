const mongoose = require("mongoose");
const Ticket = require("../models/ticket");
const fkHelper = require("../utils/FKHelper")

const laneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    validate: {
      async validator(value) {
        return await fkHelper.checkIfValueExistsInDatabase(
          mongoose.model("Board"),
          value
        );
      },
      message: "Board does not exists",
    },
    required: true,
    ref: "Board",
  },
});

laneSchema.virtual("tickets", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "laneId",
});

laneSchema.pre("findOneAndDelete", async function (next) {
  const lane = this;
  await Ticket.deleteMany({ laneId: lane._conditions._id });
  next();
});

const Lane = mongoose.model("Lane", laneSchema);

module.exports = Lane;

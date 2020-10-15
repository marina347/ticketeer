const mongoose = require("mongoose");
const Ticket = require("../models/ticket");

const laneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
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

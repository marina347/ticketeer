const express = require("express");
const mongoose = require("mongoose");

const Ticket = require("../models/ticket");
const auth = require("../middleware/auth");
const Board = require("../models/board");
const fkHelper = require("../utils/FKHelper");
const User = require("../models/user");
const Lane = require("../models/lane");
const config = require("../../config");

const router = new express.Router();

router.post("/tickets", auth, async (req, res) => {
  try {
    const ticket = new Ticket({ ...req.body, createDate: new Date() });
    const lane = await Lane.findById(ticket.laneId);
    ticket.assigners = [{ assigner: req.user._id }];
    await ticket.save();
    if (!config.SOCKETS_DISABLED) {
      const io = require("../utils/io").getIO();
      io.to(lane.boardId.toString()).emit("getTickets", req.user._id);
    }
    res.send({ ticket });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/tickets/:boardId", auth, async (req, res) => {
  try {
    await fkHelper.isUserMemberOfBoard(
      mongoose.model("Board"),
      req.user._id,
      req.params.boardId
    );
    const board = await Board.findById({ _id: req.params.boardId });
    await board.populate("lanes").execPopulate();
    const boardLanes = board.lanes;

    await Promise.all(
      boardLanes.map(async (boardLane) => {
        await boardLane.populate("tickets").execPopulate();
      })
    );

    let ticketArray = [];

    boardLanes.forEach((lane) => {
      const mappedTickets = lane.tickets.map((ticket) => {
        return { ...ticket._doc, boardId: req.params.boardId };
      });
      ticketArray = ticketArray.concat(mappedTickets);
    });
    res.send(ticketArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tickets/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id });
    if (!ticket) {
      return res.status(404).send();
    }
    const lane = await Lane.findById(ticket.laneId);
    if (!config.SOCKETS_DISABLED) {
      const io = require("../utils/io").getIO();
      io.to(lane.boardId.toString()).emit("geTickets", req.user._id);
    }
    res.send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tickets/:id", auth, async (req, res) => {
  const allowedPropsToChange = [
    "name",
    "description",
    "assigners",
    "laneId",
    "tags",
  ];
  const propertiesToChange = Object.keys(req.body);
  const isValidProp = propertiesToChange.every((prop) =>
    allowedPropsToChange.includes(prop)
  );

  if (!isValidProp) {
    return res.status(400).send({ error: "Not valid prop" });
  }

  try {
    const ticket = await Ticket.findOne({ _id: req.params.id });

    if (!ticket) {
      return res.status(404).send();
    }

    propertiesToChange.forEach((prop) => (ticket[prop] = req.body[prop]));
    const lane = await Lane.findById(ticket.laneId);
    await ticket.save();
    if (!config.SOCKETS_DISABLED) {
      const io = require("../utils/io").getIO();
      io.to(lane.boardId.toString()).emit("getTickets", req.user._id);
    }
    res.send({ ticket });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

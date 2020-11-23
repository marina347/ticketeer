const express = require("express");
const mongoose = require("mongoose");

const auth = require("../middleware/auth");
const Lane = require("../models/lane");
const fkHelper = require("../utils/FKHelper");
const config = require("../../config");

const router = new express.Router();

router.post("/lanes", auth, async (req, res) => {
  try {
    const lane = new Lane(req.body);
    await fkHelper.isUserMemberOfBoard(
      mongoose.model("Board"),
      req.user._id,
      lane.boardId
    );
    await lane.save();
    if (!config.SOCKETS_DISABLED) {
      const io = require("../utils/io").getIO();
      io.to(lane.boardId.toString()).emit("getLanes", req.user._id);
    }
    res.send({ lane });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/lanes/:boardId", auth, async (req, res) => {
  try {
    await fkHelper.isUserMemberOfBoard(
      mongoose.model("Board"),
      req.user._id,
      req.params.boardId
    );
    const lanes = await Lane.find({ boardId: req.params.boardId });
    if (!lanes) {
      return res.status(404).send();
    }
    res.send({ lanes });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/lanes/:id", auth, async (req, res) => {
  try {
    const lane = await Lane.findOneAndDelete({
      _id: req.params.id,
    });

    if (!lane) {
      return res.status(404).send();
    }

    await fkHelper.isUserMemberOfBoard(
      mongoose.model("Board"),
      req.user._id,
      lane.boardId
    );

    if (!config.SOCKETS_DISABLED) {
      const io = require("../utils/io").getIO();
      io.to(lane.boardId.toString()).emit("getLanes", req.user._id);
    }
    return res.send({ lane });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/lanes/:id", auth, async (req, res) => {
  const allowedPropsToChange = ["name"];
  const propertiesToChange = Object.keys(req.body);
  const isValidProp = propertiesToChange.every((prop) =>
    allowedPropsToChange.includes(prop)
  );

  if (!isValidProp) {
    return res.status(400).send({ error: "Not valid prop" });
  }

  try {
    const lane = await Lane.findOne({
      _id: req.params.id,
    });

    if (!lane) {
      return res.status(404).send();
    }

    await fkHelper.isUserMemberOfBoard(
      mongoose.model("Board"),
      req.user._id,
      lane.boardId
    );
    propertiesToChange.forEach((prop) => (lane[prop] = req.body[prop]));
    await lane.save();
    if (!config.SOCKETS_DISABLED) {
      const io = require("../utils/io").getIO();
      io.to(lane.boardId.toString()).emit("getLanes", req.user._id);
    }
    res.send(lane);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

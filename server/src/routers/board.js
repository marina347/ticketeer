const express = require("express");
const crypto = require("crypto-js");

const Board = require("../models/board");
const auth = require("../middleware/auth");
const User = require("../models/user");
const config = require("../../config");

const router = new express.Router();

router.get("/boards/make-invite/:boardId", auth, async (req, res) => {
  try {
    const hashedBoardId = encodeURIComponent(
      crypto.AES.encrypt(req.params.boardId, config.CRYPTO_KEY).toString()
    );
    res.send({ hashedBoardId });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/boards/join-board/:boardId", auth, async (req, res) => {
  try {
    var originalBoardId = crypto.AES.decrypt(
      req.params.boardId,
      config.CRYPTO_KEY
    ).toString(crypto.enc.Utf8);

    const board = await Board.findById(originalBoardId);

    if (!board) {
      return res.status(404).send();
    }

    const alreadyExists = board.members.find((user) => {
      if (user.member.toString().localeCompare(req.user._id.toString()) === 0) {
        return true;
      } else {
        return false;
      }
    });

    if (alreadyExists) {
      return res.status(400).send("You have already joined!");
    }

    board.members = board.members.concat({ member: req.user._id });
    await board.save();
    res.send({ originalBoardId, board });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/boards", auth, async (req, res) => {
  try {
    const boards = await Board.find({ "members.member": req.user._id });
    if (!boards) {
      return res.status(404).send();
    }

    res.send({ boards });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/boards", auth, async (req, res) => {
  const board = new Board({
    ...req.body,
    creator: req.user._id,
  });
  if (!req.body.name && req.body.name === "") {
    return res.status(400).send("Name is required!");
  }
  board.members = board.members.concat({ member: req.user._id });
  try {
    await board.save();
    res.send(board);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/boards/:id", auth, async (req, res) => {
  const allowedPropsToChange = ["name", "description", "members"];
  const propertiesToChange = Object.keys(req.body);
  const isValidProp = propertiesToChange.every((prop) =>
    allowedPropsToChange.includes(prop)
  );
  if (!isValidProp) {
    return res.status(400).send("Not valid prop");
  }
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!board) {
      return res.status(404).send();
    }
    propertiesToChange.forEach((prop) => (board[prop] = req.body[prop]));
    await board.save();
    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/boards/:id", auth, async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!board) {
      return res.status(404).send();
    }
    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/boards/:boardId/members", auth, async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.boardId,
      "members.member": req.user._id,
    });
    if (!board) {
      return res.status(404).send();
    }

    let membersArray = [];
    await Promise.all(
      board.members.map(async (member) => {
        let memberObj = await User.findById(member.member);

        membersArray.push({
          _id: memberObj._id,
          name: memberObj.name,
          email: memberObj.email,
        });
      })
    );
    res.send({ members: membersArray });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

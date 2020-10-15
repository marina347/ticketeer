const express = require("express");

const User = require("../models/user");
const auth = require("../middleware/auth");
const verifyGoogleToken = require("../utils/googleAuth");

const router = new express.Router();

router.post("/users/googleAuth", async (req, res) => {
  try {
    const googleUser = await verifyGoogleToken(req.body.googleToken);
    let user = await User.findOne({
      sub: googleUser.sub,
    });

    if (!user) {
      user = new User({ ...googleUser, lastLogin: new Date() });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

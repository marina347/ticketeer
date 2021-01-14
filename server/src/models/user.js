const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const config = require("../../config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,

    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not valid email");
      }
    },
  },
  sub: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: true,
  },
  picture: {
    type: String,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, config.JWT_SECRET, {
    expiresIn: "24h",
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

userSchema.virtual("boards", {
  ref: "Board",
  localField: "_id",
  foreignField: "creator",
});

userSchema.virtual("members", {
  ref: "Board",
  localField: "_id",
  foreignField: "members.member",
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.tokens;
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

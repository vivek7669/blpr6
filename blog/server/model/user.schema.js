require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Please enter a valid email address.",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin","superAdmin"],
    default: "user",
  },
  activation: {
    type: Boolean,
    default: false,
  },
  blogIds: [
    {
      blogId: String,
    },
  ],
  otp: {
    type: String,
  },
  tokens: [
    {
      token: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.genAuthToken = async function () {
  msg: "token creating error";
  try {
    const token = await jwt.sign(
      { id: this._id, role: this.role },
      process.env.JWT_SEC_KEY,
      { expiresIn: "1h" }
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    return console.log(error);
  }
};

const user = mongoose.model("user", userSchema);

module.exports = user;

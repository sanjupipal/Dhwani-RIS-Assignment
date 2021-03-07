const User = require("../model/User");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");

exports.register = async (req, res) => {
  const { name, password } = req.body;
  const username = shortId.generate();
  try {
    user = new User({
      name,
      password,
      username,
    });
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

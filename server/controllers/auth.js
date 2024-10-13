const AuthSchmea = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await AuthSchmea.findOne({ email: email });

    if (user) {
      return res.status(404).json({ msg: "BÖyle bir kullanıcı zaten var !" });
    }
    if (password.length < 6) {
      return res
        .status(404)
        .json({ msg: "Şifreniz  6 karakterden küçük olmamalıdır !" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email)) {
      return res.status(404).json({ msg: "Geçerli bir email adresi girin!" });
    }

    const newUser = await AuthSchmea.create({
      username,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSchmea.findOne({ email: email });

    if (!user) {
      return res.status(500).json({ msg: "Kullanıcı bulunamadı !" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(500).json({ msg: "Şifre yanlış !" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {}
};

function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) return true;
  else return false;
}

module.exports = { register, login };

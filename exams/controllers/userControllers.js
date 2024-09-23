const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { registerSchema, loginSchema } = require("../schemas/userSchemas.js");
require("dotenv").config();
const secretKey = process.env.SECKRET_KEY; ;

exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    console.error("Validation Error: ", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  const { fname, lname, password, email } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    secretKey
  ).toString();

  try {
    const user = await User.create({
      fname,
      lname,
      password: encryptedPassword,
      email,
    });
    res
      .status(201)
      .json({ message: "Пользователь успешно зарегистрирован", user });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ message: "Ошибка при регистрации пользователя" });
  }
};

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Неверные учетные данные" });

    const bytes = CryptoJS.AES.decrypt(user.password, secretKey);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password)
      return res.status(401).json({ message: "Неверные учетные данные" });

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "24h" });
    res.json({ message: "Успешный вход", token });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при входе" });
  }
};

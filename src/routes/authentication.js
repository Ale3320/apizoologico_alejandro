const express = require("express");
const router = express.Router(); //manejador de rutas de express
const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");

// router.post("/signup", async (req, res) => {
//   const { usuario, correo, clave } = req.body;
//   const user = new userSchema({
//     usuario: usuario,
//     correo: correo,
//     clave: clave,
//   });
//   user.clave = await user.encryptClave(user.clave);
//   await user.save(); //save es un método de mongoose para guardar datos en MongoDB
//   //es.json(user);
//   res.json({
//     message: "Usuario guardado.",
//   });
// });

router.post("/signup", async (req, res) => {
  const { usuario, correo, clave } = req.body;
  const user = new userSchema({
    usuario: usuario,
    correo: correo,
    clave: clave,
  });
  user.clave = await user.encryptClave(user.clave);
  await user.save(); //save es un método de mongoose para guardar datos en MongoDB //segundo parámetro: un texto que hace que el código generado sea único //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos) //primer parámetro: payload - un dato que se agrega para generar el token
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24, //un día en segundos
  });
  res.json({
    auth: true,
    token,
  });
});

module.exports = router;

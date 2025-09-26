const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../models/animalModel"); //Nuevo animal

router.post("/animal", (req, res) => {
  const animal = animalSchema(req.body);
  animal
    .save()
    .then((data) => res.json(data))//muestra datos
    .catch((error) => res.json({ message: error }));//muestra mensaje de error
});
module.exports = router;
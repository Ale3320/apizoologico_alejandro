const express = require("express");
const router = express.Router(); //manejador de rutas de express //objeto  que permite manejar rutas
const animalSchema = require("../models/animalModel"); //Nuevo animal

router.post("/animalitos", (req, res) => {
  //(req, res) método
  const animal = animalSchema(req.body); //body de la peticion (headers y body) BD
  animal
    .save() //guardar en la BD
    .then((data) => res.json(data)) //muestra datos
    .catch((error) => res.json({ message: error })); //muestra mensaje de error
});

//Consultar todos los animales
router.get("/animalitos", (req, res) => {
  animalSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal por su id
router.get("/animalitos/:id", (req, res) => {
  const { id } = req.params;
  animalSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Modificar el nombre de un animal por su id
router.put("/animalitos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, edad, tipo, fecha } = req.body;
  animalSchema
    .updateOne(
      { _id: id },
      {
        $set: { nombre, edad, tipo, fecha },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar un animal por su id

router.delete("/animalitos/:id", (req, res) => {
  const { id } = req.params;
  animalSchema
    .findByIdAndDelete(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

module.exports = router; //Siempre se deja al final

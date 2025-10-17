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

//Consultar un animal cuya edad no sea igual a un parametro dado
router.get("/animalitos/no_igual/:edad", (req, res) => {
  const { edad } = req.params;
  animalSchema
    .find({edad:{$ne:edad}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal cuya edad sea igual a un parametro dado
router.get("/animalitos/igual/:edad", (req, res) => {
  const { edad } = req.params;
  animalSchema
    .find({edad:{$eq:edad}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal cuya edad sea mayor a un parametro dado
router.get("/animalitos/mayor/:edad", (req, res) => {
  const { edad } = req.params;
  animalSchema
    .find({edad:{$gt:edad}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal cuya edad sea mayor o igual a un parametro dado
router.get("/animalitos/mayor_igual/:edad", (req, res) => {
  const { edad } = req.params;
  animalSchema
    .find({edad:{$gte:edad}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal cuya edad sea menor a un parametro dado
router.get("/animalitos/menor/:edad", (req, res) => {
  const { edad } = req.params;
  animalSchema
    .find({edad:{$lt:edad}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal cuya edad sea mayor a un parametro dado
router.get("/animalitos/menor_igual/:edad", (req, res) => {
  const { edad } = req.params;
  animalSchema
    .find({edad:{$lte:edad}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal cuya edad esta dentro de una matriz parametro dado
router.get("/animalitos/matriz/:edad", (req, res) => {
  const { edad } = req.params;
  const edadNum = edad.split(",").map(w => Number(w)); 
  animalSchema
    .find({edad:{$in:edadNum}})
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

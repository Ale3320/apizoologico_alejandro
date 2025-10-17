const mongoose = require("mongoose"); // importando el componente mongoose
const bcrypt = require("bcrypt"); // importando el componente bcrypt
const userSchema = mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
});
userSchema.methods.encryptClave = async (clave) => {
  const salt = await bcrypt.genSalt(10);//10 es la cantidad de repeticiones
  return bcrypt.hash(clave, salt);//combina la clave con la salt para generar el hash (transformacion) encriptado. Es la que se guarda en la base de datos
};
module.exports = mongoose.model("User", userSchema);
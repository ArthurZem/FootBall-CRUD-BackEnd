import mongoose, { Document, Schema } from 'mongoose';
const bcrypt = require('bcrypt');

interface Usuario extends Document {
  nome: string,
  password: string,
  email: string,
}

const UsuarioSchema: Schema = new Schema({
  nome: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

// Define um hook pré-save que utiliza o bcrypt para encriptar a senha antes de salvar no banco de dados
UsuarioSchema.pre<Usuario>('save', async function (next) {
  const user = this;

      // Verifica se a senha foi modificada ou é nova
  if (user.isModified('password') || user.isNew) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        //Atribui a senha encriptada ao campo password do usuário
        user.password = hash;
    } catch (error) {
      return next(error);
    }
  }
  // Continuar fluxo de execução
  return next();
});



const UsuarioModel = mongoose.model<Usuario>('Usuario', UsuarioSchema);

export default UsuarioModel;

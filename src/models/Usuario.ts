import mongoose, { Schema } from 'mongoose';

interface interfaceUsuario {
    id: String,
    nome: String,
    password: String,
    email: String,
    
  }

const UsuarioSchema: Schema = new mongoose.Schema(
    {    
        id: {type: String},
        nome: {type:String, required: true},
        password: {type: String, required: true},
        email: {type:String, required: true, unique: true}
    }
)

const usuarios = mongoose.model('usuario', UsuarioSchema);

export default usuarios;

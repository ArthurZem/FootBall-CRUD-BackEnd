import mongoose, { Schema } from 'mongoose';

const bcrypt = require('bcrypt');


interface interfaceUsuario{
    id: Schema.Types.ObjectId,
    nome: String,
    password: String,
    email: String,
    
  }

const UsuarioSchema: Schema = new Schema(
    {    
        id: {type: Schema.Types.ObjectId},
        nome: {type:String, required: true},
        password: {type: String, required: true},
        email: {type:String, required: true, unique: true}
    })

    UsuarioSchema.pre('save', async function (next) {
        try{
            const salt = await bcrypt.genSalt(10)
            console.log(this.nome, this.password);
            const hashPassword = await bcrypt.hash(this.password, salt)
            console.log(hashPassword);
            
            this.password = hashPassword
            console.log(this.password);
            
            next()
            
        } catch{
            next();
        }
        
    })






const usuarios = mongoose.model<interfaceUsuario>('usuario', UsuarioSchema);

module.exports = usuarios;
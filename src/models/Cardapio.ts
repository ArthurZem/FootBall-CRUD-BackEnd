import mongoose, { Schema } from 'mongoose';


 interface interfaceCardapio {
    id: String,
    preco: Number,
    nome: String,
    descricao: String,
    
  }


const CardapioSchema = new mongoose.Schema(
    {    
        id: {type: String},
        preco: {type: Number,required: true},
        nome: {type:String, required: true, unique:true},
        descricao: {type:String, required: true}
    }
)

const cardapios = mongoose.model('cardapio', CardapioSchema);

export default cardapios;

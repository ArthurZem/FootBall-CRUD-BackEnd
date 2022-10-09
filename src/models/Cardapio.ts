import mongoose, { Schema } from 'mongoose';


 interface interfaceCardapio {
    id: String,
    nome: String,
    preco: Number,
    descricao: String,
    
  }


const CardapioSchema = new mongoose.Schema(
    {    
        id: {type: String},
        nome: {type:String, required: true, unique:true},
        preco: {type: Number,required: true},
        descricao: {type:String, required: true}
    }
)

const cardapios = mongoose.model('cardapio', CardapioSchema);

export default cardapios;

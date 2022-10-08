import { Request, Response } from 'express';
import cardapios from '../models/Cardapio';


const Cardapio_Schema = require('../models/Cardapio');

class CardapioController {

    public async add(req: Request,res: Response): Promise<void> {
        let cardapio = new cardapios(req.body);
        await cardapio.save((err:any)=>{
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar novo cardapio.`})
            }
            else{
                res.status(201).send(cardapio.toJSON())
            }
        })
    }

    public getAll = (req: Request,res: Response) => {
        cardapios.find((err: any,cardapios:any)=>{
            res.status(200).json(cardapios)
        })
    }


    public get = (req: Request, res: Response) => {
        const id = req.params.id
        cardapios.findById(id, (err: any, Cardapios: any)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(Cardapios);
            }
        })
    }

    public update = (req:Request, res:Response) => {
        const id = req.params.id

        cardapios.findByIdAndUpdate(id, {$set: req.body}, (err:any, Cardapio: any)=> {
            if(err){
                res.status(500).send({message: err.message});
            }   
            else{
                res.status(200).send({message: 'prato atualizado com sucesso!'})
            }
        })
    }

    public delete = (req: Request, res: Response) => {
        const id = req.params.id

        cardapios.findByIdAndDelete(id , (err:any)=> {
            if(err){
                res.status(500).send({message: err.message})
            }
            else{
                res.status(200).send('Prato deletado com sucesso!')
            }
        })
    }

}



export default new CardapioController();
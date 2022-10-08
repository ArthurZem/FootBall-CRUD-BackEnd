import { Request, Response } from 'express';
import usuarios from '../models/Usuario';

const Usuario_Schema = require('../models/Usuario');

class UsuarioController {
    public async add(req: Request,res: Response): Promise<void> {
        let usuario = new usuarios(req.body);
        await usuario.save((err:any)=>{
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar novo usuario.`})
            }
            else{
                res.status(201).send(usuario.toJSON())
            }
        })
    }

    public getAll = (req: Request,res: Response) => {
        usuarios.find((err: any,usuarios:any)=>{
            res.status(200).json(usuarios)
        })
    }


    public get = (req: Request, res: Response) => {
        const id = req.params.id
        usuarios.findById(id, (err: any, usuarios: any)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(usuarios);
            }
        })
    }

    public update = (req:Request, res:Response) => {
        const id = req.params.id

        usuarios.findByIdAndUpdate(id, {$set: req.body}, (err:any, usuario: any)=> {
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

        usuarios.findByIdAndDelete(id , (err:any)=> {
            if(err){
                res.status(500).send({message: err.message})
            }
            else{
                res.status(200).send('Prato deletado com sucesso!')
            }
        })
    }

}

export default new UsuarioController();
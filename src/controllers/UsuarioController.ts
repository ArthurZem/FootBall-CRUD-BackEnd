import { Request, Response } from 'express';
import usuarios from '../models/Usuario';


const Usuario_Schema = require('../models/Usuario');

class UsuarioController {
    public async index(req: Request, res: Response): Promise<Response> {
        const Usuario = await Usuario_Schema.find();
        return res.json(Usuario);
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        await Usuario_Schema.find((err: any, Usuario: any) => {
            if (err) {
                res.send(err)
            } else {
                res.send(Usuario)
            }
        })
    }

    public async get(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        await Usuario_Schema.findById(id, (err: any, Usuario: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send(Usuario);
            }
        })
    }

    public async add(req: Request, res: Response): Promise<void> {
        let Usuario = new Usuario_Schema(req.body);
        await Usuario.save((err: any) => {
            if (err) {
                res.send(err)
            } else {
                res.send(Usuario)
            }
        })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        await Usuario_Schema.deleteOne({ _id: req.params.id }, (err: any) => {
            if (err) {
                res.send(err)
            } else {
                res.send("Ok")
            }
        })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        await Usuario_Schema.findByIdAndUpdate(id, req.body, (err: any, Usuario: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send(Usuario);
            }
        })
    }



    public async store(req: Request, res: Response): Promise<Response> {
        const Usuario = await Usuario_Schema.create(req.body);
        return res.json(Usuario);
    }
}

export default new UsuarioController();
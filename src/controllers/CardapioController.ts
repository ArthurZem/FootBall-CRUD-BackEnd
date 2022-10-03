import { Request, Response } from 'express';
import cardapios from '../models/Cardapio';


const Cardapio_Schema = require('../models/Cardapio');

class CardapioController {
    public async index(req: Request, res: Response): Promise<Response> {
        const cardapio = await Cardapio_Schema.find();
        return res.json(cardapio);
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        await Cardapio_Schema.find((err: any, cardapio: any) => {
            if (err) {
                res.send(err)
            } else {
                res.send(cardapio)
            }
        })
    }

    public async get(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        await Cardapio_Schema.findById(id, (err: any, Cardapio: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send(Cardapio);
            }
        })
    }

    public async add(req: Request, res: Response): Promise<void> {
        let Cardapio = new Cardapio_Schema(req.body);
        await Cardapio.save((err: any) => {
            if (err) {
                res.send(err)
            } else {
                res.send(Cardapio)
            }
        })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        await Cardapio_Schema.deleteOne({ _id: req.params.id }, (err: any) => {
            if (err) {
                res.send(err)
            } else {
                res.send("Ok")
            }
        })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        await Cardapio_Schema.findByIdAndUpdate(id, req.body, (err: any, Cardapio: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send(Cardapio);
            }
        })
    }



    public async store(req: Request, res: Response): Promise<Response> {
        const Cardapio = await Cardapio_Schema.create(req.body);
        return res.json(Cardapio);
    }
}

export default new CardapioController();
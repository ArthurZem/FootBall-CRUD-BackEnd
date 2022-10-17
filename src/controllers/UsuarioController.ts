import { request, Request, response, Response } from 'express';
import { model } from 'mongoose';

const Usuario_Schema = require('../models/Usuario');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usuarioModel = require ("../models/Usuario");

const usuario = {
    index: async(req: Request, res: Response) =>{
        const {email} = req.headers;

        const userExists = await usuarioModel.find({});

        if(userExists){
            return res.status(200).json(userExists);
        }
        return res.status(404);
    },

    getUsuario: async(req:Request, res: Response) =>{
        const { email } = req.headers;

        const userExists = await usuarioModel.findOne({email: email});

        if(userExists){
            return res.status(200).json(userExists);
        }
        return res.status(404);
    },

    createUser: async(req: Request, res: Response) => {
        const {nome, email, password} = req.body;

        const userExists = await usuarioModel.findOne({email: email});

        if(userExists){
            return res.status(200).json(userExists);
        }
        return res.status(404);

        // Criar password

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new usuarioModel({
            nome,
            email,
            hashPassword
        });

        try{
            await newUser.save();

            res.status(201).json({message: `Usuário cadastrado!`})
        }catch{Error}{
            res.status(500).json({message: `erro ao cadastrar`})
        }
    },

    login: async(req: Request, res: Response) => {
        const {email, password} = req.body;

        if(!email){
            return res.status(422).json({message: `O email deve ser obrigatório`});
        }
        
        if(!password){
            return res.status(422).json({message: `A senha deve ser obrigatória`});
        }

        const user = await usuarioModel.findOne({ email: email });

        const checkPassword = await bcrypt.compare(password, user.passwordHash);

        if (!checkPassword) {
            return response.status(422).json({ msg: "Senha inválida" });
          }

          try {
            const secret = process.env.SECRET;
      
            const token = jwt.sign(
              {
                id: user.id,
              },
              secret
            );
      
            response.status(200).json({
              msg: "Autenticação realizada com sucesso!",
              token,
              user: {
                id: user._id,
                nome: user.nome,
              },
            });
          } catch (error) {
            response.status(500).json({ msg: error });
          }
    },
};


/*class UsuarioController {
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

    public login = async (req: Request, res: Response) =>{
        const {email, password} = req.body;
        const checkPassword = await bcrypt.compare(password, usuarios.schema.path(password));
        console.log("password: ", password);
        console.log("checkPassword: ", checkPassword);
        
        
        
    }


}



export default new UsuarioController();
*/
export {usuario}
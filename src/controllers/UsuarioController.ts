import { Request, Response } from "express";
import { model } from "mongoose";
import usuarios from "../models/Usuario";

const Usuario_Schema = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsuarioController {
  public async add(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await usuarios.create(req.body);
  
      // Gerar token JWT
      const token = jwt.sign({ id: usuario._id }, "secret", {
        expiresIn: 86400, // Expira em 24 horas
      });
  
      // Retorna a resposta com o token JWT
      res.status(201).send({ usuario, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `${error.message} - falha ao cadastrar novo usuario.`,
      });
    }
  }
  

  public getAll = (req: Request, res: Response) => {
    usuarios.find((err: any, usuarios: any) => {
      res.status(200).json(usuarios);
    });
  };

  public get = (req: Request, res: Response) => {
    const id = req.params.id;
    usuarios.findById(id, (err: any, usuarios: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(usuarios);
      }
    });
  };

  public update = (req: Request, res: Response) => {
    const id = req.params.id;

    usuarios.findByIdAndUpdate(
      id,
      { $set: req.body },
      (err: any, usuario: any) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(200).send({ message: "Usuário atualizado com sucesso!" });
        }
      }
    );
  };

  public delete = (req: Request, res: Response) => {
    const id = req.params.id;

    usuarios.findByIdAndDelete(id, (err: any) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send("Usuário deletado com sucesso!");
      }
    });
  };

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Procura o usuário pelo e-mail fornecido
      const usuario = await usuarios.findOne({ email });

      // Verifica se o usuário foi encontrado e se a senha está correta
      if (usuario && (await bcrypt.compare(password, usuario.password))) {
        // Gera um token JWT com a ID do usuário
        const token = jwt.sign({ id: usuario._id }, "secret", {
          expiresIn: "1h",
        });
        // Retorna o token
        return res.json({ token });
      } else {
        // Retorna um erro se as credenciais forem inválidas
        return res.status(401).json({ message: "E-mail ou senha inválidos." });
      }
    } catch (error) {
      // Retorna um erro se houver um erro ao buscar o usuário no banco de dados
      return res.status(500).json({ message: "Erro ao realizar login." });
    }
  }

  public deleteAll = async (req: Request, res: Response) => {
    try {
      const result = await usuarios.deleteMany({});
      res
        .status(200)
        .send(
          `Todos os usuários foram deletados. O total de usuários deletados foi de ${result.deletedCount}.`
        );
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default new UsuarioController();

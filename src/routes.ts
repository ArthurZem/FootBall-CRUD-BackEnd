import { Request, Response, Router } from "express";
import express from "express";
import UsuarioController from "./controllers/UsuarioController";

const routes = Router();

const rotaUsuario = express.Router();

rotaUsuario.post;

routes.get("/", (req, res) => {
  return res.send("Inicialização de rota.");
});

// Rotas de Usuário

routes.delete("/users/:id", UsuarioController.delete); // apagar usuário //
routes.post("/cadastroUsuario", UsuarioController.add); // cadastrar usuário //
routes.get("/users", UsuarioController.getAll); // listar todos os usuários //
routes.get("/users/:id", UsuarioController.get); // encontrar usuário por id//
routes.put("/users/:id", UsuarioController.update); // atualizar usuário pelo id//
routes.post("/login", UsuarioController.login); // realizar login/
routes.delete("/users", UsuarioController.deleteAll); // deletar todos os usuários

export default routes;

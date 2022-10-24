import { Request, Response, Router } from 'express';
import express from 'express';
import CardapioController from './controllers/CardapioController';
import UsuarioController from './controllers/UsuarioController';
import { checkUserBody } from './auth/jwt';

const routes = Router();

const rotaUsuario = express.Router();

rotaUsuario.post

routes.get('/', (req, res) => {
  return res.send('Inicialização de rota.');
})

// Rotas de Cardapio
routes.delete('/cardapio/:id',CardapioController.delete);// apagar prato do Cardapio //
routes.post('/cadastroPrato', CardapioController.add);// cadastrar prato no cardapio//
routes.get('/cardapio',CardapioController.getAll);// listar Cardapio com todos os pratos //
routes.get('/cardapio/:id',CardapioController.get);// listar prato através do id//
routes.put('/cardapio/:id',CardapioController.update); // atualizar algum prato localizando através do Cardapio pelo id//


// Rotas de Usuário

routes.delete('/users/:id',UsuarioController.delete);// apagar usuário //
routes.post('/cadastroUsuario', UsuarioController.add);// cadastrar usuário //
routes.get('/users',UsuarioController.getAll);// listar todos os usuários //
routes.get('/users/:id',UsuarioController.get);// encontrar usuário por id//
routes.put('/users/:id',UsuarioController.update); // atualizar usuário pelo id//
routes.post('/users/',UsuarioController.login);// encontrar usuário por id//



 
export default routes;
import { Request, Response, Router } from 'express';
import express from 'express';
import CardapioController from './controllers/CardapioController';
import {usuario as UsuarioController} from './controllers/UsuarioController';
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
rotaUsuario.post("/cadastroUsuario", checkUserBody, async(req: Request, res:Response)=>{
  await UsuarioController.createUser(req,res);
})
rotaUsuario.post("/auth/login", async (request: Request, response: Response) => {
  await UsuarioController.login(request, response);
});

rotaUsuario.get("/user?email", async (request: Request, response: Response) => {
  await UsuarioController.getUsuario(request, response);
});

rotaUsuario.get("/users", async (request: Request, response: Response) => {
  await UsuarioController.index(request, response);
});
/*routes.delete('/users/:id',UsuarioController.delete);// apagar usuário //
routes.post('/cadastroUsuario', UsuarioController.add);// cadastrar usuário //
routes.get('/users',UsuarioController.getAll);// listar todos os usuários //
routes.get('/users/:id',UsuarioController.get);// encontrar usuário por id//
routes.put('/users/:id',UsuarioController.update); // atualizar usuário pelo id//
routes.post('/users/',UsuarioController.login);// encontrar usuário por id//
*/



 
export default rotaUsuario;
//export default routes;
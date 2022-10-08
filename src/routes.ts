import { Router } from 'express';
import CardapioController from './controllers/CardapioController';
import UsuarioController from './controllers/UsuarioController';

const routes = Router();


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
routes.delete('/user/:id',UsuarioController.delete);// apagar usuário //
routes.post('/cadastroUsuario', UsuarioController.add);// cadastrar usuário //
routes.get('/listUser',UsuarioController.getAll);// listar todos os usuários //
routes.get('/findUser/:id',UsuarioController.get);// encontrar usuário por id//
routes.put('/atualizarUser/:id',UsuarioController.update); // atualizar usuário pelo id//



 

export default routes;
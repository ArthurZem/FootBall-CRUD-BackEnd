import { Router } from 'express';
import CardapioController from './controllers/CardapioController';

const routes = Router();


routes.get('/', (req, res) => {
  return res.send('Inicialização de rota.');
})

// Rotas de Cardapio
routes.delete('/Cardapio/:id',CardapioController.delete);// apagar prato do Cardapio //
routes.post('/cadastroPrato', CardapioController.add);// cadastrar prato no cardapio//
routes.get('/Cardapio',CardapioController.getAll);// listar Cardapio com todos os pratos //
routes.get('/buscarPrato/:id',CardapioController.get);// listar prato através do id//
routes.put('/atualizarCardapio/:id',CardapioController.update); // atualizar algum prato localizando através do Cardapio pelo id//


// Rotas de Usuário
routes.delete('/user/:id',CardapioController.delete);// apagar usuário //
routes.post('/cadastroUsuario', CardapioController.add);// cadastrar usuário //
routes.get('/listUser',CardapioController.getAll);// listar todos os usuários //
routes.get('/findUser/:id',CardapioController.get);// listar  Cardapios por id//
routes.put('/atualizarUser/:id',CardapioController.update); // atualizar Cardapio pelo id//



 

export default routes;
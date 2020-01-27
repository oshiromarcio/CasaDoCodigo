const { check } = require('express-validator/check');

const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

module.exports = (app) => {
    app.get('/', baseControlador.home());
    
    // Listagem de livros
    app.get('/livros', livroControlador.lista());

    // Formulário de inclusão de livro
    app.get('/livros/form', livroControlador.formularioCadastro());

    // Formulário de edição de livro
    app.get('/livros/form/:id', livroControlador.formularioEdicao());

    // Adição de novo livro
    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
    ], livroControlador.cadastra());

    // Adição de novo livro
    app.put('/livros', livroControlador.edita());

    // Exclusão de livro
    app.delete('/livros/:id', livroControlador.remove());
}

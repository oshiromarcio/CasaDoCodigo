const { check } = require('express-validator/check');

const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

module.exports = (app) => {
    const rotasBase = BaseControlador.rotas();
    const rotasLivro = LivroControlador.rotas();

    app.get(rotasBase.home, baseControlador.home());
    
    // Listagem de livros
    app.get(rotasLivro.lista, livroControlador.lista());

    // Formulário de inclusão de livro
    app.get(rotasLivro.cadastro, livroControlador.formularioCadastro());

    // Formulário de edição de livro
    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());

    // Adição de novo livro
    app.post(rotasLivro.lista, [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
    ], livroControlador.cadastra());

    // Adição de novo livro
    app.put(rotasLivro.lista, livroControlador.edita());

    // Exclusão de livro
    app.delete(rotasLivro.delecao, livroControlador.remove());
}

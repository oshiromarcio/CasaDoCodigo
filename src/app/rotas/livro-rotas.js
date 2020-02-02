const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

const Livro = require('../modelos/livro');

const BaseControlador = require('../controladores/base-controlador');

module.exports = (app) => {
    const rotasLivro = LivroControlador.rotas();

    app.use(rotasLivro.autenticadas, function(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect(BaseControlador.rotas().login);
        }
    });
    
    // Listagem de livros
    app.get(rotasLivro.lista, livroControlador.lista());

    // Formulário de inclusão de livro
    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put(Livro.validacoes(), livroControlador.edita());

        // Formulário de edição de livro
    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());

    // Exclusão de livro
    app.delete(rotasLivro.delecao, livroControlador.remove());
}

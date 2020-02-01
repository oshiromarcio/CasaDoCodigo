const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

const Livro = require('../modelos/livro');

module.exports = (app) => {
    const rotasLivro = LivroControlador.rotas();
    
    // Listagem de livros
    app.get(rotasLivro.lista, livroControlador.lista());

    // Formulário de inclusão de livro
    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put(livroControlador.edita());

        // Formulário de edição de livro
    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());

    // Exclusão de livro
    app.delete(rotasLivro.delecao, livroControlador.remove());
}

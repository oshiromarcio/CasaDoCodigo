const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

class LivroControlador {

    static rotas() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        };
    }

    lista() {
        return function(req, res) {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                    .then(livros => res.marko(
                        require('../views/livros/lista/lista.marko'),
                        {
                            livros
                        }
                    ))
                    .catch(erro => console.log(erro));
        };
    }

    formularioEdicao() {
        return function(req, res) {
            const { id } = req.params;
            const livroDao = new LivroDao(db);
    
            livroDao.buscaPorId(id)
                    .then(livro => 
                        res.marko(  require('../views/livros/form/form.marko'),
                                    { livro }
                        )
                    )
                    .catch(erro => console.log(erro));
        };
    }

    formularioCadastro() {
        return function(req, res) {
            res.marko(  require('../views/livros/form/form.marko'),
                        { livro: { } }
                );
        }
    }

    cadastra() {
        return function(req, res) {
            console.log(req.body);
            const erros = validationResult(req);
    
            if (!erros.isEmpty()) {
                return res.marko(
                        require('../views/livros/form/form.marko'),
                        {
                            livro: {},
                            errosValidacao: erros.array()
                        }
                );
            }
            const livroDao = new LivroDao(db);
            livroDao.adiciona(req.body)
                    .then(res.redirect(LivroControlador.rotas().lista))
                    .catch(erro => console.log(erro));
        };
    }

    edita() {
        return function(req, res) {
            console.log(req.body);
            const livroDao = new LivroDao(db);
            livroDao.atualiza(req.body)
                    .then(res.redirect(LivroControlador.rotas().lista))
                    .catch(erro => console.log(erro));
        };
    }

    remove() {
        return function(req, res) {
            const { id } = req.params;
            console.log(id);
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => res.status(200).end())
                .catch(erro => console.log(erro));
        };
    }
}

module.exports = LivroControlador;
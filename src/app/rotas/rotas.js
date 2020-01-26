const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(req, res) {
        res.send('<html>  <head>  <meta charset="utf-8"> </head>  <body> <h1> Casa do Código </h1> </body> </html>');
    });
    
    // Listagem de livros
    app.get('/livros', function(req, res) {

        const livroDao = new LivroDao(db);
        livroDao.lista()
                .then(livros => res.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros
                    }
                ))
                .catch(erro => console.log(erro));
    });

    // Formulário de inclusão de livro
    app.get('/livros/form', function(req, res) {
        res.marko(  require('../views/livros/form/form.marko'),
                    { livro: { } }
            );
    });

    // Formulário de edição de livro
    app.get('/livros/form/:id', function(req, res) {
        const { id } = req.params;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
                .then(livro => 
                    res.marko(  require('../views/livros/form/form.marko'),
                                { livro }
                    )
                )
                .catch(erro => console.log(erro));
    });

    // Adição de novo livro
    app.post('/livros', function(req, res) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
                .then(res.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    // Adição de novo livro
    app.put('/livros', function(req, res) {
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
                .then(res.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    // Exclusão de livro
    app.delete('/livros/:id', function(req,res) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => res.status(200).end())
            .catch(erro => console.log(erro));
    });
}

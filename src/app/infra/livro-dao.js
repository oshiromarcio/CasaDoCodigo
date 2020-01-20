class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, results) => {
                    if (erro)
                        return reject('Não foi possível listar os livros!');
                    return resolve(results);
                }
            )
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run('INSERT INTO livros (titulo, preco, descricao) VALUES (?, ?, ?)',
                [livro.titulo, livro.preco, livro.descricao],
                (err) => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adiciona o livro!');
                    }
                    resolve();
                });
        });
    };

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run('DELETE FROM livros WHERE id = ?',
                [id],
                (err) => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível excluir o livro.');
                    }
                    resolve();
                });
        });
    };

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run('UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?',
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                (err) => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível atualizar o livro.');
                    }
                    resolve();
                });
        });
    };

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get('SELECT id, titulo, preco, descricao FROM livros WHERE id = ?',
            [id],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return reject('Não foi possível buscar o livro.');
                }
                resolve(results);
            });
        });
    };
}

module.exports = LivroDao;
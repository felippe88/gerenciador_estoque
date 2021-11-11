
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

///middleware do token que valida a autenticacao
const { eAdmin } = require('./middlewares/auth');

const Produto = require('./models/Produto');

const Usuario = require('./models/Usuario');

//Indica que irá receber o request no formato json
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});



app.get('/view-produto/:id', eAdmin, async (req, res) => {

    const { id } = req.params;

    await Produto.findByPk(id)
        .then((produto) => {
            return res.json({
                erro: false,
                produto
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum produto encontrado!"
            });
        });
});

app.get('/view-usuario/:id', eAdmin, async (req, res) => {

    const { id } = req.params;

    await Usuario.findByPk(id)
        .then((usuario) => {
            return res.json({
                erro: false,
                usuario
            });

        }).catch(() => {
            return res.json({
                erro: true,
                mensagem: "Erro: Usuário não encontrado!"
            });
        });
});

app.get('/list-produto', eAdmin, async (req, res) => {
    await Produto.findAll({
        attributes: ['id', 'nome', 'preco_compra', 'preco_venda', 'quantidade'],
        order: [['ID', 'DESC']]
    })
        .then((produtos) => {
            return res.json({
                erro: false,
                produtos,
                //caso queira pode retornar o id do usuario ou outras permissoes
                //idUsuario: req.userId
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum produto encontrado!"
            });
        });
});

app.post("/login", async (req, res) => {
    const user = await Usuario.findOne({
        attributes: ['id', 'email', 'email', 'password'],
        where: {
            email: req.body.email
        }
    });

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }



    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Usuário ou a senha incorreta!"
        });
    }

    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
        //expiresIn: 600
        expiresIn: '7d',
    })

    ///valida token
    
    app.get("/val-token", eAdmin, async (req, res) => {
        
        await Usuario.findByPk(req.userId)
        .then((user) => {
            
            return res.json({
                erro: false,
                user
            });
        }).catch(() => {
            
            return res.status(400).json({
                
                erro: true,
                mensagem: "Erro: Necessário realizar o login!!"
            });
        });
    });

    return res.json({
        erro: false,
        token
    });


});

app.get('/list-usuarios', eAdmin, async (req, res) => {
    await Usuario.findAll({
        attributes: ['id', 'nome', 'email'],
        order: [['ID', 'DESC']]
    })
        .then((usuarios) => {
            return res.json({
                erro: false,
                usuarios
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Não há usuarios!"
            });
        });
});

app.post('/cad-produto', eAdmin, async (req, res) => {
    await Produto.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Produto não cadastrado!"
            });
        });

});

app.post('/cad-usuario', async (req, res) => {
    var dados = req.body;

    dados.password = await bcrypt.hash(dados.password, 8);

    await Usuario.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não cadastrado"
            });
        });
});

app.put('/edit-produto', eAdmin, async (req, res) => {
    const { id } = req.body;
    await Produto.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto Editado!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Produto não editado!"
            });
        })
})

app.put('/edit-usuario', eAdmin, async (req, res) => {
    const { id } = req.body;
    const dados = req.body;

    dados.password = await bcrypt.hash(dados.password, 8);

    await Usuario.update(dados, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário alterado!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Usuario não alterado"
            });
        });
});


app.delete('/delete-produto/:id', eAdmin, async (req, res) => {
    const { id } = req.params;

    await Produto.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto apagado!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Produto não apagado!"
            });

        });
});

app.delete('/delete-usuario/:id', eAdmin, async (req, res) => {
    const { id } = req.params;

    await Usuario.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário apagado!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Usuario não apagado!"
            });

        });
});



app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});



const Sequelize = require('sequelize');

const db = require('./db');

const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }

});


module.exports = Usuario;

//Cria a tabela quando nao existe;
//Usuario.sync();

//Se houver alteração executa
//Usuario.sync({ alter: true });
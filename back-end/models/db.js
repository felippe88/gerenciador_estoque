const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('estoque', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
  });

sequelize.authenticate()
.then(()=>{
    console.log("Conexão com banco de dados realizada com sucesso!");
}).catch(()=>{
    console.log("Erro: Conexão com banco de dados não realizada!");
});
module.exports = sequelize;
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const { dataBaseConnection } = require('../db/database')
class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.usersPath = '/api/users';
    this.ticketPath = '/api/tickets';
    this.articlePath = '/api/articles';
    this.dataBaseConnection()
    this.middlewares()
    this.routes()
  }
  async dataBaseConnection(){
    await dataBaseConnection()
  }
  middlewares(){
    this.app.use(cors());
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: false}))
  }
  routes(){
    this.app.use(this.usersPath, require('../routes/users.routes'), errors());
    this.app.use(this.ticketPath, require('../routes/tickets.routes'));
    this.app.use(this.articlePath, require('../routes/articles.routes'));
  }
  listen(){
    this.app.listen(this.port, ()=>{
      console.log(`Escuchando en el puerto ${this.port}`)
    })
  }
}

module.exports = Server;
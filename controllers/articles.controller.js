const { response, request} = require("express")

//Model - Schema
const Article = require('../models/articles.model')

//Read
const articleGet = async(req = request, res = response) => {

  try {
    const queryParam = { id };
    const NumeroEntradas = await Article.countDocuments({user: req.user.id});
    const usuario = await Article.find(queryParam).populate("article").limit(Number(limite));
    res.status(200).json({
      total: NumeroEntradas,
      usuario
    })
  } catch (error) {
    res.status(500).json({
      message:'Algo Ocurrio buscando --Articles',
    })
  }
}

//Create
const articlePost = async(req = request, res = response) => {

  try {
    const { name, price, amount} = req.body
    const data ={name, price, amount}

    const article = new Article(data)
    await article.save()
    user: req.user.id

    res.status(200).json({
      message:'Articles Route desde el controller -- POST',
      article
    })
    
  } catch (error) {
    res.status(500).json({
      message:'Error en el servidor',
      error
    })
  }

}
 

//Update
const articlePut = async(req = request, res) => {

  try {
    const { id } = req.params;
    const { name, price, amount } = req.body
    const data = {name, price, amount}

    await Article.findByIdAndUpdate(id, data)
    res.status(200).json({
      message:'Usuarios Modificados con exito',
      ok:true
    })
    
  } catch (error) {
    res.status(500).json({
      message:"Algo salio mal cuando intentabamos actualizar el usuario"
    })
  }
}

//Delete
const articleDel = async(req = request, res = response ) => {

  try {
    const {id} = req.params
    const falseState = {state: false}
    const article = await Article.findByIdAndUpdate(id, falseState)
  
    res.status(200).json({
      message: ` El Usuario con el id: ${id} fue eliminado`,
      article
    })
    
    } catch (error) {
      res.status(500).json({
        message:"Algo salio mal cuando intentabamos eliminar el Articulo"
    })
  }
}

module.exports = {
  articleGet,
  articlePost,
  articlePut,
  articleDel
}
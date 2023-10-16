const { response, request} = require("express")

//Model - Schema
const Ticket = require('../models/tickets.model')
//Joi


//Read
const ticketGet = async(req = request, res = response) => {

 /*   try {
        const queryParam = {state:true};
        const { limite = 10 } = req.query
        const NumeroEntradas = await Ticket.countDocuments()
       
        const usuario = await Ticket.find(queryParam).populate("ticket").limit(Number(limite));
        res.status(200).json({
          total: NumeroEntradas,
          usuario
        })
      } catch (error) {
        res.status(500).json({
          message:'Algo Ocurrio cuando buscabamos Ticket',
        })
      }
      */
      try {
        const queryParam = {state:true};
        const { limite = 10 } = req.query
        const NumeroEntradas = await Ticket.countDocuments()
        const usuario = await Ticket.find(queryParam).populate("ticket").limit(Number(limite));
        res.status(200).json({
          total: NumeroEntradas,
          usuario
        })
      } catch (error) {
        res.status(500).json({
          message:'Algo Ocurrio cuando buscabamos Tickets',
        })
      }
}

//Create
const ticketPost = async(req = request, res = response) => {

    try {
        const { subtotal, iva, total, article, userName} = req.body
        const data ={subtotal, iva, total, article, userName}
    
        const ticket = new Ticket(data)
        await ticket.save()
    
        res.status(200).json({
          message:'Ticket Route desde el controller -- POST',
          ticket
        })
        
      } catch (error) {
        res.status(500).json({
          message:'Error en el servidor Create-Tickets',
          error
        })
      }
}

//Update
const ticketPut = async(req = request, res) => {

    
  try {
    const { id } = req.params;
    const { subtotal, iva, total, article, userName } = req.body
    const data = {subtotal, iva, total, article, userName}

    await Ticket.findByIdAndUpdate(id, data)
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
const ticketDel = async(req = request, res = response ) => {

    try {
        const {id} = req.params
        const falseState = {state: false}
        const ticket = await Ticket.findByIdAndUpdate(id, falseState)
      
        res.status(200).json({
          message: ` El Usuario con el id: ${id} fue eliminado`,
          ticket
        })
        
        } catch (error) {
          res.status(500).json({
            message:"Algo salio mal cuando intentabamos eliminar el Ticket"
        })
      }
}

module.exports = {
  ticketGet,
  ticketPost,
  ticketPut,
  ticketDel
}
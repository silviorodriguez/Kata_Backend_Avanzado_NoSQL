const { response, request} = require("express")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')



//Model - Schema
const User = require('../models/users.model');
//Joi
const { schema } = require('../validators/users.validators')

//Read
const userGet = asyncHandler( async(req = request, res = response) => {
     try {
    const queryParam = {state:true};
    const { limite = 10 } = req.query
    const NumeroEntradas = await User.countDocuments()
    const usuario = await User.find().limit(Number(limite));
    res.status(200).json({
      total: NumeroEntradas,
      usuario
    })
  } catch (error) {
    res.status(500).json({
      message:'Algo Ocurrio cuando buscabamos usuarios',
    })
  }
})
/*const userGet = async(req = request, res = response) => {

       try {
         const queryParam = {state:true};
         const { limite = 10 } = req.query
         const NumeroEntradas = await Ticket.countDocuments()
         const usuario = await User.find(queryParam).populate("ticket").limit(Number(limite));
         res.status(200).json({
           total: NumeroEntradas,
           usuario
         })
       } catch (error) {
         res.status(500).json({
           message:'Algo Ocurrio cuando buscabamos al usuario',
         })
       }
 }*/

//Create
const userPost = asyncHandler(async (req, res) => {
  try {
    const { userName, email, phoneNumber, password, service } = req.body;
    if (!userName || !email || !phoneNumber || !password || !service) {
      res.status(400).json({ error: 'Faltan Datos' });
      return;
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(409).json({ error: 'El usuario ya existe en la base de datos' });
      return;
    }

    // Hash al password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creamos el usuario
    const user = await User.create({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
      service
    });

    if(user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        service: user.service,
      });
    } else {
      res.status(400).json({ error: 'No se pudo registrar al usuario' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
const loginUser = asyncHandler(async (req, res ) => {

  const { email, password } = req.body
  if ( !email || !password ) {
    res.status(400)
    throw new Error('Faltan datos')
  }

const user = await User.findOne({ email })
if (user && (await bcrypt.compare(password, user.password))) {
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  })
} else {
  res.status(400)
  throw new Error('Credenciales Incorrectas')
}
})

//Update
const userPut = asyncHandler( async(req = request, res) => {

  try {
    const { id } = req.params;
    const { userName, email, phoneNumber, password, state, service } = req.body
    const data = {userName, email, phoneNumber, password, state, service}

    const user = await User.findByIdAndUpdate(id, data)
    res.status(200).json({
      message:'Usuarios Modificados con exito',
      ok:true
    })
    
  } catch (error) {
    res.status(500).json({
      message:"Algo salio mal cuando intentabamos actualizar el usuario"
    })
  }
})

//Delete
const userDel = asyncHandler( async(req = request, res = response ) => {
  try {
    const {id} = req.params
    const falseState = {state: false}
    const user = await User.findByIdAndUpdate(id, falseState)
  
    res.status(200).json({
      message: ` El Usuario con el id: ${id} fue eliminado`,
      user
    })
    
    } catch (error) {
      res.status(500).json({
        message:"Algo salio mal cuando intentabamos eliminar el usuario"
    })
  }
})


// funcion para generar el JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '60m'
  })
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDel,
  loginUser
}
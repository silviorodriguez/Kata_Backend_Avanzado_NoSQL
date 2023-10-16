const { Schema, model, default: mongoose } = require('mongoose');


const UserSchema = mongoose.Schema({
  userName:{
    type:String,
    required: [true, " El userName es requerido"],
    unique: true
  },
  email:{
    type:String,
    required: [true, " El email es requerido"],
    unique: true
  },
  phoneNumber:{
    type:Number
  },
  password:{
    type: String,
    required: [true, "El Password es requerido"]
  },
})

module.exports = model('User', UserSchema)

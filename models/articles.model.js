const { number } = require('joi');
const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
  name:{
    type: String,
    require: [true, "el nobre es requerido"],
  },
  price:{
    type: Number,
    required: [true, " El precio es requerido"],
    default: 0
    
  },
  amount:{
    type: Number,
    required: [true, " La cantidad es requerida"]
  }
})

module.exports = model('Article', ArticleSchema)
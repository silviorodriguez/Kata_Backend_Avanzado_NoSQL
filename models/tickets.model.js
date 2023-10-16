const { number } = require('joi');
const { Schema, model } = require('mongoose');

const TicketSchema = new Schema({
  subtotal:{
    type: Number

  },
  iva:{
    type: Number,
    default: 16
    
  },
  total:{
    type: Number
  },
  article:{
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  userName:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Ticket', TicketSchema)
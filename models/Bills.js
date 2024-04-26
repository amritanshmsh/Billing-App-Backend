const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: String,
        required: true,
    },
    paymentMethod: {
      type:String,
      required: true,
    },
    products: {
        type: Array,
        required: true,
    }
},{timestamps:true})

const Bill = mongoose.model("Bill",billSchema)

module.exports = Bill
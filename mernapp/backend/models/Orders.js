const mongoose = require('mongoose')

const {Schema} =  mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('order', OrderSchema)
//This will create users (plural form) database and will store each data stored in UserSchema


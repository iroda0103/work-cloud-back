const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // verification_id: { type: Number, unique: true, required: true },
    email: { type: String, required: true },
    code: { type:Number,required:true }
}, {
    timestamps:{
        createdAt:'created_at',
        updatedAt:null
    },
    versionKey: false,
})
module.exports = mongoose.model('Verification', schema)
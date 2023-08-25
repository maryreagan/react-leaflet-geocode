const mongoose = require("mongoose")

const Address = new mongoose.Schema(
    {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }, 
        state: {
            type: String,
            required: true
        }, 
        zip: {
            type: String,
            required: true
        },
        coords: {
            type: Array,
            required: true
        }
    }, {timestamps: true}
)
module.exports = mongoose.model("address", Address)
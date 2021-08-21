const mongoose = require('mongoose')
const validator = require('validator')


const Task =mongoose.model('Data', {

        title:{
            type: String ,
            required: true,
            minlength:4,
            maxlength:20,
            trim:true
        },
        content:{
            type: String,
            required: true,
            minlength: 10,
            maxlength:500,
            trim:true
        },
    
        dutodate:{
            type:Date,
            validate(value){
                if(!validate.isAfter(value)) return new Error ("Date must be after Today")

            }

        }

})

module.exports = Task
const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{type: String,
    unique : true,
    required:[true,"email is Required"]
  },
  password:{
    type: String,
    minlength: 5,
    required:[true,"password is Required"]
    },
         address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        }
      

});

const User = mongoose.model("User", userschema);
module.exports=User;
const mongoose = require("mongoose")


const Orderschema = new mongoose.Schema({
    
        user : { type: ObjectId, ref: 'User' },
        restaurant : { type: ObjectId, ref: 'Restaurant' },
      items: [{
        name: String,
        price: Number,
        quantity: Number
      }],
      totalPrice: Number,
      deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      status: {
      type :  String,
      enum : ["placed", "preparing", "on the way", "delivered"],
      default:"placed"

      }
});

const Order = mongoose.model("Order", orderschema);

module.exports=Order;
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
 
    vendorname:{
        type: String,
    },
    bankaccnum:{
        type:Number,
    },
    bankname:{
        type:String,
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    addressline1:{
        type:String
    },
    addressline2:{
        type:String
    },
    zipcode:{
        type:Number
    }
}); 

const vendormodel = mongoose.model('vendor',vendorSchema);

module.exports = vendormodel;
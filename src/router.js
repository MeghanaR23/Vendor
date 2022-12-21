const vendormodel = require('../src/Models/vendormodel');
const express= require('express');
const router= express.Router();

// API endpoint to return list of all vendors
router.get('/listofvendor',async (req, res) =>{
const vendor = await vendormodel.find().sort({"_id": -1});
res.json(vendor);
});


// API endpoint to create new Vendor with all required fields
router.post('/createvendor', async(req, res) =>{
    const {vendorname,bankaccnum,bankname,city,country,addressline1,addressline2,zipcode} = req.body;
    const vendor = new vendormodel({
     vendorname, bankaccnum, bankname, city, country,addressline1,addressline2, zipcode
    })
   const newvendor = await vendor.save();
   res.json(newvendor)
});

// API endpoint to edit an existing Vendor
router.put('/updatevendor/:id', async(req,res) =>{
    const {id} = req.params;
    const vendor = await vendormodel.findById(id);
    vendor.vendorname = req.body.vendorname;
    vendor.bankaccnum = req.body.bankaccnum;
    vendor.bankname = req.body.bankname;
    vendor.city = req.body.city;
    vendor.country = req.body.country;
    vendor.addressline1 = req.body.addressline1;
    vendor.addressline2 = req.body.addressline2;
    vendor.zipcode = req.body.zipcode;

    await vendor.save();
    res.json(vendor);
});

// API endpoint to delete an existing Vendor
router.delete('/deletevendor/:id', async(req,res) =>{
    const {id} = req.params;
    const vendor = await vendormodel.findById(id);
    await vendor.remove();
    res.json(vendor);
});

// API endpoint to check if vendor exits
router.get('/checkvendor/:id', async(req,res) =>{
    const {id} = req.params;
    let idExist = await vendormodel.exists({ _id: id})
    if(!idExist){
        res.status(404).json({"message": "ID doesnot exists."});
        return
    }
    const vendor = await vendormodel.findById(id);
    res.json(vendor);
});

module.exports= router;
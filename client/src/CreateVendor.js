import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogContent, DialogContentText } from '@mui/material';
import API_ENDPOINT from './const'


export default function CreateVendor({createOpen, handleClose}) {

  const [vendorName, setVendorName] = React.useState('');
  const [bankAccNumber, setBankAccNumber] = React.useState('');
  const [bankName, setBankName] = React.useState('');
  const [city, setCity]  = React.useState('');
  const [country, setCountry] = React.useState('');
  const [addressLine1, setAddressLine1] = React.useState('');
  const [addressLine2, setAddressLine2] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [isError,setIsError]= React.useState(false);

 function handleSubmit(event){
    event.preventDefault();
    if( vendorName === "" || bankAccNumber === "" || bankName === ""){
      setIsError(true);
      setTimeout(function() {
        setIsError(false);
      }, 3000);
      return
    }

    var data={
      "vendorname" : vendorName,
      "bankaccnum" : bankAccNumber,
      "bankname" : bankName,
      "city": city,
      "country":country,
      "addressline1": addressLine1,
      "addressline2": addressLine2,
      "zipcode": zipCode
    }

    fetch(`${API_ENDPOINT}/createvendor`,{ 
      method:'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, 
      body: JSON.stringify(data),
    })
    .then((res) =>{
      window.location.reload();
    });
}
  return (
    <div>
      <Dialog
        open={createOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create Vendor"}
          {isError && <div style={{color:'red', marginTop: '2rem'}}>
        Enter all required Fields
        </div>
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      validate="true"
      autoComplete="off"
      >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Vendor Name"
          value={vendorName}
          onInput={e =>setVendorName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Bank Account Number"
          value={bankAccNumber}
          type={"number"}
          onInput={e =>setBankAccNumber(e.target.value)}
        />
      </div>
      <div>
        <TextField
         required
          id="outlined-required"
          label="Bank Name"
          value={bankName}
          onInput={e =>setBankName(e.target.value)}
        />
         <TextField
          id="outlined"
          label="City"
          value={city}
          onInput={e =>setCity(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined"
          label="Country"
          value={country}
          onInput={e =>setCountry(e.target.value)}
        />
         <TextField
          id="outlined"
          label="AddressLine1"
          value={addressLine1}
          onInput={e =>setAddressLine1(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-required"
          label="AddressLine2"
          value={addressLine2}
          onInput={e =>setAddressLine2(e.target.value)}  
        />
         <TextField
          id="outlined"
          type="number"
          label="Zip Code"
          value={zipCode}
          onInput={e =>setZipCode(e.target.value)}
        />
      </div>
      <Button variant="contained"  justifyContent="flex-end" type="submit" onClick={(event) =>{handleSubmit(event)}}>Submit</Button>
      </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
);
}
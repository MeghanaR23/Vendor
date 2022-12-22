import React, {useState, useEffect} from 'react';
import DataTable from './DataTable';
import AlertDialog from './PopUp';
import {Button} from '@mui/material';
import CreateVendor from './CreateVendor';
import UpdateVendor from './UpdateVendor';
import API_ENDPOINT from './const';

function App() {
  const [vendorList, setVendorList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState(null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [vendorDetails, setVendorDetails] = React.useState(null);

  function fetchData(){
    fetch(`${API_ENDPOINT}/listofvendor`)
     .then((res) => res.json())
     .then((data) => setVendorList(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleRemove(){
    fetch(`${API_ENDPOINT}/deletevendor/${idDelete}`,{method : 'DELETE'} )
      .then(() => {
        fetchData();
        handleClose();
      });   
  }
  
  const handleClickOpen = (row) => {
    setIdDelete(row)
    setOpen(true);
  };

  const openCreateVendor = () =>{
    setCreateOpen(true);
  };

  const handleClose = () => {
    setIdDelete(null)
    setOpen(false);
    setCreateOpen(false);
    setOpenUpdate(false);
    setVendorDetails(null);
  };

  const checkEdit = (row) =>{
    fetch(`${API_ENDPOINT}/checkvendor/${row}`,{method : 'GET'} )
    .then((res) => res.json())
    .then((data) =>{
      if(data.message === "ID doesnot exists."){
        alert(data.message);
        window.location.reload();
      }
      setOpenUpdate(true)
      setVendorDetails(data)
    })
    .catch((err) =>{
      alert(err.message);
      window.location.reload();
    })
  }


  return (
    <div className="App">
      <Button variant="contained" onClick={openCreateVendor}>Create Vendor</Button>
      <DataTable ListofVendor={vendorList} handleClickOpen={handleClickOpen} checkEdit={checkEdit}/>
      <AlertDialog pop={open}  handleClose={handleClose} Remove={handleRemove}/>
      <CreateVendor createOpen={createOpen} handleClose ={handleClose}/>
      {vendorDetails && <UpdateVendor openUpdate={openUpdate} vendorDetails={vendorDetails} handleClose ={handleClose}/>}
    </div>
  );
}

export default App;

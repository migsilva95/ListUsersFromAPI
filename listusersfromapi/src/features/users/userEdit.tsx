import React, { useEffect, useState } from 'react';
import { Modal, TextField, Typography, Button, Box } from '@mui/material';
  
type MyType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    gap: 0.5,
};

export function UserEdit(props: { user: MyType; showModal: boolean; setShowModal: (showModal: boolean) => any; saveButton: (user: MyType) => any; }) {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressZipcode, setAddressZipcode] = useState("");
    const [addressGeoLat, setAddressGeoLat] = useState("");
    const [addressGeoLng, setAddressGeoLng] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyCatchPhrase, setCompanyCatchPhrase] = useState("");
    const [companyBs, setCompanyBs] = useState("");

    useEffect(() => {
        setName(props.user.name);
        setUsername(props.user.username);
        setEmail(props.user.email);
        setAddressStreet(props.user.address?.street);
        setAddressCity(props.user.address?.city);
        setAddressZipcode(props.user.address?.zipcode);
        setAddressGeoLat(props.user.address?.geo?.lat);
        setAddressGeoLng(props.user.address?.geo?.lng);
        setPhone(props.user.phone);
        setWebsite(props.user.website);
        setCompanyName(props.user.company?.name);
        setCompanyCatchPhrase(props.user.company?.catchPhrase);
        setCompanyBs(props.user.company?.bs);
      },[props.user]);

      const saveButton = () => {
        let user:MyType = {
            id: props.user.id,
            name: name,
            username: username,
            email: email,
            address: {
              street: addressStreet,
              suite: props.user.address.suite,
              city: addressCity,
              zipcode: addressZipcode,
              geo: {
                lat: addressGeoLat,
                lng: addressGeoLng
              }
            },
            phone: phone,
            website: website,
            company: {
              name: companyName,
              catchPhrase: companyCatchPhrase,
              bs: companyBs
            }
        }

        props.saveButton(user);
      }

    return (
        <>
            <Modal
                open={props.showModal}
                onClose={() => {props.setShowModal(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit User Detail
                    </Typography>
                    <br />
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <div>
                            <TextField id="outlined-basic" label="name" variant="outlined" onChange={(e) => { setName(e.target.value)}} value={name} />
                            <TextField id="outlined-basic" label="username" variant="outlined" onChange={(e) => { setUsername(e.target.value)}} value={username} />
                            <TextField id="outlined-basic" label="email" variant="outlined" onChange={(e) => { setEmail(e.target.value)}} value={email} />
                            <TextField id="outlined-basic" label="adress street" variant="outlined" onChange={(e) => {setAddressStreet(e.target.value)}} value={addressStreet} />
                            <TextField id="outlined-basic" label="address city" variant="outlined" onChange={(e) => {setAddressCity(e.target.value)}} value={addressCity} />
                            <TextField id="outlined-basic" label="address zipcode" variant="outlined" onChange={(e) => {setAddressZipcode(e.target.value)}} value={addressZipcode} />
                            <TextField id="outlined-basic" label="address geo lat" variant="outlined" onChange={(e) => {setAddressGeoLat(e.target.value)}} value={addressGeoLat} />
                            <TextField id="outlined-basic" label="address geo lng" variant="outlined" onChange={(e) => {setAddressGeoLng(e.target.value)}} value={addressGeoLng} />
                            <TextField id="outlined-basic" label="phone" variant="outlined" onChange={(e) => {setPhone(e.target.value)}} value={phone} />
                            <TextField id="outlined-basic" label="website" variant="outlined" onChange={(e) => {setWebsite(e.target.value)}} value={website} />
                            <TextField id="outlined-basic" label="company name" variant="outlined" onChange={(e) => {setCompanyName(e.target.value)}} value={companyName} />
                            <TextField id="outlined-basic" label="company catchPhrase" variant="outlined" onChange={(e) => {setCompanyCatchPhrase(e.target.value)}} value={companyCatchPhrase} />
                            <TextField id="outlined-basic" label="company bs" variant="outlined" onChange={(e) => {setCompanyBs(e.target.value)}} value={companyBs} />
                            <br />
                            <Button variant="outlined" onClick={() => {props.setShowModal(false)}} >Cancel</Button>
                            <Button variant="contained" onClick={saveButton} >Edit</Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
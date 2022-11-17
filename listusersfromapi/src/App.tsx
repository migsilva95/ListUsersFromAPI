import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Users } from './features/users/users';
import { UserEdit } from './features/users/userEdit';

function App() {
  
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

  const [users, setUsers] = useState<MyType[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [userToEdit, setUserToEdit] = useState<MyType>({} as any);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  },[]);

  const deleteButton = (id: number) => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'DELETE',
    });
    setUsers((current) => current.filter((user) => user.id !== id));
  }

  const editButton = (user: MyType) => {
    setUserToEdit(user);
    setShowModal(true);
  }

  const saveButton = (user: MyType) => {
    setShowModal(false);
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

      const newUser = users.map(u => {
        if (u.id === user.id) {
          return user;
        }
        return u;
      });
  
      setUsers(newUser);
  }

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{
          "& .MuiTableRow-hover:hover": {
            backgroundColor: "#e59f9b !important"
          },
          "& .Mui-selected": {
            backgroundColor: "#d0433c !important"
          } 
          }} 
          aria-label="simple table"
          stickyHeader
          >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><b>id</b></TableCell>
              <TableCell><b>name</b></TableCell>
              <TableCell><b>username</b></TableCell>
              <TableCell><b>e-mail</b></TableCell>
              <TableCell><b>city</b></TableCell>
              <TableCell><b>company name</b></TableCell>
              <TableCell><b>has website</b></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <Users user={u} selectedId={selectedId} setSelectedId={setSelectedId} deleteButton={deleteButton} editButton={editButton} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserEdit user={userToEdit} showModal={showModal} setShowModal={setShowModal} saveButton={saveButton}/>
    </div>
  );
}

export default App;

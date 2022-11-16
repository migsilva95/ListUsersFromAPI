import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Users } from './features/users/users';

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

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  });


  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>id</b></TableCell>
              <TableCell><b>name</b></TableCell>
              <TableCell><b>username</b></TableCell>
              <TableCell><b>e-mail</b></TableCell>
              <TableCell><b>city</b></TableCell>
              <TableCell><b>company name</b></TableCell>
              <TableCell><b>has website</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <Users user={u} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;

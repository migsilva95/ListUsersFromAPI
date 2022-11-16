import React, { useEffect, useState } from 'react';
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableHead, TableBody } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Users.css';
  
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

export function Users(props: { user: MyType; }) {
    
    const useStyles = makeStyles((theme) => ({
        /* Styles applied to the root element. */
        root: {
          // Default root styles
          color: 'inherit',
          display: 'table-row',
          verticalAlign: 'middle',
          // We disable the focus ring for mouse, touch and keyboard users.
          outline: 0,
      
          '&$hover:hover': {
            // Set hover color
            backgroundColor: theme.palette.action.hover,
          },
        },
      
        /* Pseudo-class applied to the root element if `hover={true}`. */
        hover: {},
      }));

    
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [todos, setTodos] = React.useState([]);

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users/' + props.user.id + '/todos')
        .then((response) => response.json())
        .then((data) => setTodos(data));
    });
  
    return (
        <>
            <TableRow
                    hover
                    key={props.user.id}
                    sx={{ '& > *': { borderBottom: 'unset' } }}
                    classes={classes}
                >
                <TableCell>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.user.id}</TableCell>
                <TableCell>{props.user.name}</TableCell>
                <TableCell>{props.user.username}</TableCell>
                <TableCell>{props.user.email}</TableCell>
                <TableCell>{props.user.address.city}</TableCell>
                <TableCell>{props.user.company.name}</TableCell>
                <TableCell>{props.user.website ? <CheckIcon /> : <CloseIcon />}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                    <TableCell><b>id</b></TableCell>
                                    <TableCell><b>name</b></TableCell>
                                    <TableCell><b>username</b></TableCell>
                                    <TableCell><b>e-mail</b></TableCell>
                                    <TableCell><b>street</b></TableCell>
                                    <TableCell><b>city</b></TableCell>
                                    <TableCell><b>zipcode</b></TableCell>
                                    <TableCell><b>geo</b></TableCell>
                                    <TableCell><b>phone</b></TableCell>
                                    <TableCell><b>website</b></TableCell>
                                    <TableCell><b>company name</b></TableCell>
                                    <TableCell><b>company catchPhrase</b></TableCell>
                                    <TableCell><b>company bs</b></TableCell>
                                    <TableCell><b>Nº TODOS</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={props.user.id}>
                                        <TableCell>{props.user.id}</TableCell>
                                        <TableCell>{props.user.name}</TableCell>
                                        <TableCell>{props.user.username}</TableCell>
                                        <TableCell>{props.user.email}</TableCell>
                                        <TableCell>{props.user.address.street}</TableCell>
                                        <TableCell>{props.user.address.city}</TableCell>
                                        <TableCell>{props.user.address.zipcode}</TableCell>
                                        <TableCell>{props.user.address.geo.lat + " , " + props.user.address.geo.lng}</TableCell>
                                        <TableCell>{props.user.phone}</TableCell>
                                        <TableCell>{props.user.website}</TableCell>
                                        <TableCell>{props.user.company.name}</TableCell>
                                        <TableCell>{props.user.company.catchPhrase}</TableCell>
                                        <TableCell>{props.user.company.bs}</TableCell>
                                        <TableCell>{todos.length}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
        </TableRow>
        </>
    );
}

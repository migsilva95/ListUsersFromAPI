import React, { useEffect } from 'react';
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableHead, TableBody, Paper, MenuList, MenuItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
  
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

export function Users(props: { user: MyType; selectedId: number; setSelectedId: (selectedId: number) => any; deleteButton: (id: number) => any; editButton: (user: MyType) => any; }) {

    const [todos, setTodos] = React.useState([]);
    const [showMenu, setShowMenu] = React.useState(false);

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users/' + props.user.id + '/todos')
        .then((response) => response.json())
        .then((data) => setTodos(data));
    },[props.user.id]);

    const clickRow = (id: number) => {
        if (props.selectedId !== props.user.id) {
            setShowMenu(false);
        }
        props.setSelectedId(id);
    };

    const clickDots = (id: number) => {
        setShowMenu(!showMenu);
        props.setSelectedId(id);
    };

    const clickDelete = (id: number) => {
        props.deleteButton(id);
        setShowMenu(!showMenu);
    };

    const clickEdit = (user: MyType) => {
        props.editButton(user);
        setShowMenu(!showMenu);
    };
  
    return (
        <>
            <TableRow
                    hover
                    key={props.user.id}
                    sx={{ '& > *': { borderBottom: 'unset' } }}
                    onClick={() => clickRow(props.user.id)}
                    selected={props.selectedId === props.user.id}
                >
                <TableCell>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    >
                    {props.selectedId === props.user.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.user.id}</TableCell>
                <TableCell>{props.user.name}</TableCell>
                <TableCell>{props.user.username}</TableCell>
                <TableCell>{props.user.email}</TableCell>
                <TableCell>{props.user.address.city}</TableCell>
                <TableCell>{props.user.company.name}</TableCell>
                <TableCell>{props.user.website ? <CheckIcon /> : <CloseIcon />}</TableCell>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => {clickDots(props.user.id)}}
                        >
                        <MoreVertIcon />
                    </IconButton>
                    {props.selectedId === props.user.id && showMenu && <Paper sx={{ maxWidth: '100%' }}>
                        <MenuList>
                            <MenuItem>
                                <ListItemText><div onClick={() => {clickEdit(props.user)}}>Edit</div></ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemText><div onClick={() => {clickDelete(props.user.id)}}>Remove</div></ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Paper>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={props.selectedId === props.user.id } timeout="auto" unmountOnExit>
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

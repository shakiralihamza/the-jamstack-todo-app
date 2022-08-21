import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {Checkbox, CircularProgress} from "@mui/material";
import {useState} from "react";
// import {MyContext} from "../context/MyContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
/*

const deleteTodo = (todoId) => {
    return fetch('/.netlify/functions/delete', {
        body: JSON.stringify({id: todoId}),
        method: 'POST',
    }).then(response => {
        return response.json()
    })
}
const updateTodo = (updatedTodo) => {
    return fetch('/.netlify/functions/update', {
        body: JSON.stringify(updatedTodo),
        method: 'POST',
    }).then(response => {
        return response.json()
    })
}
*/

export default function BasicTable() {
    // const {todos, setTodos, setIsEditDialogOpen, setTodoToEdit} = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [deletingId, setDeletingId] = useState('');
    const [completingId, setCompletingId] = useState('');
const todos: any = []
/*
    useEffect(() => {
        fetch('/.netlify/functions/read-all')
            .then(response => {
                return response.json()
            })
            .then(data => {
                const todos = data.map(todo => ({...todo.data, id: todo.ref['@ref'].id}))
                // alert(JSON.stringify(todos))
                setIsLoading(false)
                setTodos(todos)
            }).catch(error => {
            console.log('error: ' + error)
        })

    }, [setTodos])
*/

    const handleDelete = (id: any) => {
       /* setIsDeleting(true);
        setDeletingId(id)
        deleteTodo(id)
            .then((response) => {
                console.log('Delete API response', response)
                // set app state
                setIsDeleting(false);
                setDeletingId('');
                setTodos(todos.filter(todo => todo.id !== id))
            })
            .catch((error) => {
                console.log('API error', error)
            })*/
    }
    const handleDone = (todo: any) => {
       /* setIsCompleting(true);
        setCompletingId(todo.id)
        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        }
        updateTodo(updatedTodo)
            .then((response) => {
                console.log('Update API response', response)
                // set app state
                setIsCompleting(false);
                setCompletingId('');
                //update todo in state
                const newTodos = todos.map(todo => todo.id === response.data.id ? response.data : todo)
                setTodos(newTodos)
            })
            .catch((error) => {
                console.log('API error', error)
            })*/
    }

    const handleEdit =(todo: any)=>{
       /* setTodoToEdit(todo);
        setIsEditDialogOpen(true);*/

    }
    if (isLoading) {
        return <>
            <Box sx={{display: 'flex', pl: 5}}>
                <CircularProgress/>
            </Box>
        </>
    }
    if (todos.length > 0) {
        return (<TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell align="left">Author</TableCell>
                        <TableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todos.map((todo: any) => {
                        return (
                            <TableRow
                                key={todo.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                selected={todo.completed}
                            >
                                <TableCell padding="checkbox">
                                    {
                                        isCompleting && todo.id === completingId
                                            ? <CircularProgress color={'primary'} size={18} sx={{ml:1.5}}/>
                                            :
                                            <Checkbox
                                                onClick={() => handleDone(todo)}
                                                color="primary"
                                                checked={todo.completed}
                                            />
                                    }
                                </TableCell>
                                <TableCell>
                                    {todo.item}
                                </TableCell>
                                <TableCell align="left">{todo.author}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        disableRipple
                                        size="small"
                                        onClick={() => handleEdit(todo)}
                                        color="primary"
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(todo.id)}
                                        disableRipple
                                        size="medium"
                                        sx={{color: 'secondary.main'}}
                                    >

                                        {
                                            isDeleting && todo.id === deletingId
                                                ? <CircularProgress color={'secondary'} size={24}/>
                                                : <DeleteForeverIcon/>
                                        }
                                    </IconButton>
                                </TableCell>
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>);
    } else {
        return <Typography variant={'body1'} sx={{pl: 5}}>No todos found</Typography>
    }
}

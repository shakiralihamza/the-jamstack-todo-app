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
import {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {gql, useMutation, useQuery} from "@apollo/client";
import MyContext from "../context/MyContext";
import {Todo} from "../interfaces";

const READ_TODOS = gql`
    query {
        todos {
            id
            title
            author
            completed
        }
    }
`;

const DELETE_TODO = gql`
    mutation deleteTodo($deleteTodoId: ID!) {
        deleteTodo(id: $deleteTodoId) {
            id
        }
    }
`;
const DONE_TODO = gql`
    mutation doneTodo($doneTodoId: ID!, $completed: Boolean!) {
        doneTodo(id: $doneTodoId, completed: $completed) {
            id
        }
    }
`;

export default function BasicTable() {
    const {todos, setTodos, setIsEditDialogOpen, setTodoToEdit} = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [deletingId, setDeletingId] = useState('');
    const [completingId, setCompletingId] = useState('');

    const {data} = useQuery(READ_TODOS);
    const [deleteTodo] = useMutation(DELETE_TODO)
    const [doneTodo] = useMutation(DONE_TODO)
    useEffect(() => {
        if (data) {
            setIsLoading(false)
            setTodos(data.todos)
        }
    }, [data])

    const handleDelete = (id: string) => {
        setIsDeleting(true);
        setDeletingId(id)
        deleteTodo({variables: {deleteTodoId: id}})
            .then(() => {
                setIsDeleting(false);
                setDeletingId('');
                setTodos(todos.filter(todo => todo.id !== id))
            })
    }
    const handleDone = (todo: Todo) => {
        setIsCompleting(true);
        setCompletingId(todo.id)
        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        }
        doneTodo({variables: {doneTodoId: todo.id, completed: !todo.completed}})
            .then(() => {
                setIsCompleting(false);
                setCompletingId('');
                setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t))
            })
            .catch(err => {
                console.log('GQL Delete error: ', err)
            })
    }

    const handleEdit = (todo: Todo) => {
        setTodoToEdit(todo);
        setIsEditDialogOpen(true);
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
                    {todos.map((todo: Todo) => {
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
                                            ? <CircularProgress color={'primary'} size={18} sx={{ml: 1.5}}/>
                                            :
                                            <Checkbox
                                                onClick={() => handleDone(todo)}
                                                color="primary"
                                                checked={todo.completed}
                                            />
                                    }
                                </TableCell>
                                <TableCell>
                                    {todo.title}
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

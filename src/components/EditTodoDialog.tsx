import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import {Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
// import {MyContext} from "../context/MyContext";
// import {useContext, useEffect} from "react";
import LoadingButton from "@mui/lab/LoadingButton";

/*const updateTodo = (updatedTodo) => {
    return fetch('/.netlify/functions/update', {
        body: JSON.stringify(updatedTodo),
        method: 'POST',
    }).then(response => {
        return response.json()
    })
}*/

export default function EditTodoDialog() {
    // const {isEditDialogOpen, setIsEditDialogOpen, todoToEdit, setTodos, todos} = useContext(MyContext);

    const [todo, setTodo] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
const isEditDialogOpen = false;
/*
    useEffect(() => {
        setTodo(todoToEdit.item);
        setAuthor(todoToEdit.author);
    },[isEditDialogOpen, todoToEdit.author, todoToEdit.item]);
*/
    const handleSubmit = () => {
        /*setIsLoading(true);
        const updatedTodo = {
            ...todoToEdit,
            item: todo,
            author
        }
        updateTodo(updatedTodo)
            .then((response) => {
                console.log('Update API response', response)
                // set app state
                const newTodos = todos.map(todo => todo.id === response.data.id ? response.data : todo)
                setTodos(newTodos)

                setTodo('')
                setAuthor('')
                setIsLoading(false)
                handleClose()
            })
            .catch((error) => {
                console.log('API error', error)
            })*/
    }
    const handleClose = () => {
        // setIsEditDialogOpen(false);
    };

    return (
        <div>
            <Dialog open={isEditDialogOpen} onClose={handleClose} maxWidth={'md'} fullWidth>
                <Grid container
                      justifyContent={'center'}
                      alignItems={'stretch'}
                      sx={{h: '100%', width: '100%'}}
                >
                    <Grid item xs={5} sx={{backgroundColor: '#0C1251', p: 5}}>
                        <Grid container sx={{height: '300px'}} direction={'column'} justifyContent={'space-between'}>
                            <Grid item xs={2}>
                                <Typography variant={'h5'} fontWeight={100}>
                                    Edit Todo
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant={'h5'} fontWeight={100}>
                                    <Stack spacing={2}>
                                        <Button fullWidth variant={'outlined'} disabled={isLoading} color={"secondary"}
                                                onClick={handleClose}>Cancel</Button>
                                        <LoadingButton
                                            fullWidth
                                            color="secondary"
                                            onClick={handleSubmit}
                                            loading={isLoading}
                                            variant="contained"
                                        >
                                            Save
                                        </LoadingButton>
                                    </Stack>
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={7} sx={{backgroundColor: 'primary.dark', p: 5}}>
                        <Stack spacing={5}>
                            <TextField
                                disabled={isLoading}
                                value={todo}
                                variant={"outlined"}
                                label="Todo Item"
                                onChange={(e) => setTodo(e.target.value)}
                            />
                            <TextField
                                disabled={isLoading}
                                value={author}
                                variant={"outlined"}
                                label="Author"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Stack>

                    </Grid>

                </Grid>
            </Dialog>
        </div>
    );
}

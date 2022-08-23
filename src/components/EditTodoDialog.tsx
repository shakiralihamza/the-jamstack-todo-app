import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import {Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import {gql, useMutation} from "@apollo/client";
import {useContext, useEffect} from "react";
import MyContext from "../context/MyContext";
import {Todo} from "../interfaces";


const UPDATE_TODO = gql`
    mutation UpdateTodo($updateTodoId: ID!, $title: String!) {
        updateTodo(id: $updateTodoId, title: $title) {
            id
            createdAt
        }
    }
`;

export default function EditTodoDialog() {
    const {isEditDialogOpen, setIsEditDialogOpen, todoToEdit, setTodos, todos} = useContext(MyContext);

    const [updateTodo] = useMutation(UPDATE_TODO);
    const [title, setTitle] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(false);
    useEffect(() => {
        setTitle(todoToEdit.title);
        console.log('useeffect: ', todos);
    }, [isEditDialogOpen]);

    const handleSubmit = () => {
        setIsLoading(true);
        const updatedTodo = {
            ...todoToEdit,
            title
        }
        console.log(todoToEdit);
        updateTodo({variables: {updateTodoId: todoToEdit.id, title}})
            .then((response) => {
                setIsLoading(false)
                handleClose()
                setTitle('')
                console.log('current state Before, ', todos)
                const newTodos: Todo[] = todos.map(todo => {
                    if (todo.id === todoToEdit.id) {
                        return {...updatedTodo, createdAt: response.data.updateTodo.createdAt}
                    }
                    return todo;
                })

                console.log(' Update, ', newTodos)

                setTodos(newTodos)
                console.log('current state After, ', todos)

            }).catch((err) => console.log('error: ', err))
    }
    const handleClose = () => {
        setIsEditDialogOpen(false);
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
                                value={title}
                                variant={"outlined"}
                                label="Todo Item"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Stack>

                    </Grid>

                </Grid>
            </Dialog>
        </div>
    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import {Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MyContext from "../context/MyContext";
import {useContext} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import {gql, useMutation} from "@apollo/client";

const CREATE_TODO = gql`
    mutation CreateTodo($title: String!, $author: String!) {
        createTodo(title: $title, author: $author) {
            id
            title
            author
            completed
        }
    }
`;

export default function AddTodoDialog() {
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const {todos, setTodos, isDialogOpen, setIsDialogOpen} = useContext(MyContext);

    const [createTodo] = useMutation(CREATE_TODO);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleSubmit = () => {
        setIsLoading(true);

        createTodo({variables: {title, author}})
            .then((response) => {
                setTodos([...todos, response.data.createTodo]);
                setTitle('')
                setAuthor('')
                setIsLoading(false)
                handleClose()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleClose} maxWidth={'md'} fullWidth>
                <Grid container
                      justifyContent={'center'}
                      alignItems={'stretch'}
                      sx={{h: '100%', width: '100%'}}
                >
                    <Grid item xs={5} sx={{backgroundColor: '#0C1251', p: 5}}>
                        <Grid container sx={{height: '300px'}} direction={'column'} justifyContent={'space-between'}>
                            <Grid item xs={2}>
                                <Typography variant={'h5'} fontWeight={100}>
                                    Add New ToDo
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
                                            Add
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
                                variant={"outlined"}
                                label="Todo Item"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                disabled={isLoading}
                                variant={"outlined"}
                                label="Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Stack>

                    </Grid>

                </Grid>
            </Dialog>
        </div>
    );
}

import React, {FC} from 'react';
import AddTodo from "./AddTodo";
import EditTodoDialog from "./EditTodoDialog";
import AddTodoDialog from "./AddTodoDialog";
import List from './List';

interface TodoAppProps {
    path: string
}
const TodoApp:FC<TodoAppProps> = () => (
    <>
        <AddTodo/>
        <AddTodoDialog/>
        <EditTodoDialog/>
        <List/>
    </>
);

export default TodoApp;

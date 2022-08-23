import React from "react"
import {Todo} from "../interfaces";

type defaultProps = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

    isEditDialogOpen: boolean;
    setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

    todoToEdit: Todo;
    setTodoToEdit: React.Dispatch<React.SetStateAction<Todo>>;

    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

// @ts-ignore
const defaultState: defaultProps = {
    todos: []
}

const MyContext = React.createContext(defaultState)

const ContextProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<any>('')
    const [todos, setTodos] = React.useState<Todo[]>([])
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState<boolean>(false)
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
    const [todoToEdit, setTodoToEdit] = React.useState<Todo>({
        id: '',
        title: '',
        author: '',
        completed: false,
        createdAt: ''
    })

    const contextValues = {
        todos,
        setTodos,

        isEditDialogOpen,
        setIsEditDialogOpen,

        todoToEdit,
        setTodoToEdit,

        isDialogOpen,
        setIsDialogOpen,

        user,
        setUser
    }

    return (
        <MyContext.Provider value={contextValues}>
            {children}
        </MyContext.Provider>
    );
}
export default MyContext

export {ContextProvider}

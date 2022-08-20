import React from "react"
import { Router } from "@reach/router"
import Layout from "./layout";
import TodoApp from "./TodoApp";

const App = () => {
    return (
        <Layout>
            <Router basepath="/app">
                <TodoApp path="/" />
            </Router>
        </Layout>
    )
}

export default App

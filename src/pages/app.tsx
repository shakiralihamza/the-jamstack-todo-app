import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout";
import TodoApp from "../components/TodoApp";

const App = () => {
    // @ts-ignore
    return (
        <Layout>
            <Router basepath="/app">
                <TodoApp path="/" />
            </Router>
        </Layout>
    )
}

export default App

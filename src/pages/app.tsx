import React from "react"
import {Router} from "@reach/router"
import Layout from "../components/layout";
import TodoApp from "../components/TodoApp";
import PrivateRoute from "../components/PrivateRoute"
import Default from "../components/Default"

const App = () => {
    return (
        <Layout>
            <Router basepath="/app">
                <PrivateRoute path="/" component={TodoApp} default={Default}/>
            </Router>
        </Layout>
    )
}

export default App

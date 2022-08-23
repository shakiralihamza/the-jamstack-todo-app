import React from "react"
import {Router} from "@reach/router"
import Layout from "../components/layout";
import TodoApp from "../components/TodoApp";
import PrivateRoute from "../components/PrivateRoute"
import Default from "../components/Default"
import {HeadFC} from "gatsby";

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

export const Head: HeadFC = () => <title>Dashboard</title>

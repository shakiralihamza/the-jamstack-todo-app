const process = require('process')
const {ApolloServer, gql} = require('apollo-server-lambda')


const typeDefs = gql`
    type Todo {
        title: String!
        author: String!
        completed: Boolean!
    }
    type Query {
        allTodos: [Todo!]
    }
`;
const todos = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
        completed: false
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
        completed: true
    },
];
const resolvers = {
    Query: {
        todos: () => todos,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


exports.handler = server.createHandler();

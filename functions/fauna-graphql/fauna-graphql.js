const process = require('process')
const {ApolloServer, gql} = require('apollo-server-lambda')
const fauna = require('faunadb');
const q = fauna.query;
const client = new fauna.Client({secret: process.env.FAUNADB_SERVER_SECRET});
const getHandler = (event, context) => {

    const typeDefs = gql`
        type Todo {
            id: ID!
            title: String!
            author: String!
            completed: Boolean!
        }
        type Query {
            todos: [Todo!]
        }
        type Mutation {
            createTodo(title: String!, author: String!): Todo
            doneTodo(id: ID!, completed: Boolean!): Todo
            deleteTodo(id: ID!): Todo
            updateTodo(id: ID!, title: String!, author: String!): Todo
        }
    `;

    const resolvers = {
        Query: {
            todos: async () => {
                const response = await client.query(q.Paginate(q.Match(q.Index('todos'))))

                return response.data.map(([ref, title, author, completed]) => ({
                    id: ref.id,
                    title,
                    author,
                    completed
                }))
            }
        },
        Mutation: {
            createTodo: async (_, {title, author}) => {
                const completed = false;
                const response = await client.query(q.Create(q.Collection('todos'), {data: {title, author, completed}}))
                return {
                    id: response.ref.id,
                    ...response.data
                }

            },
            doneTodo: async (_, {id, completed}) => {
                const response = await client.query(q.Update(q.Ref(q.Collection('todos'), id), {data: {completed}}))
                return {
                    id: response.ref.id,
                    ...response.data,
                }
            },
            deleteTodo: async (_, {id}) => {
                const response = await client.query(q.Delete(q.Ref(q.Collection('todos'), id)))
                return {
                    id: response.ref.id,
                    ...response.data
                }
            },
            updateTodo: async (_, {id, title, author}) => {
                const response = await client.query(q.Update(q.Ref(q.Collection('todos'), id), {data: {title, author}}))
                return {
                    id: response.ref.id,
                    ...response.data
                }
            }
        }
    };
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const graphqlHandler = server.createHandler();
    if (!event.requestContext) {
        event.requestContext = context;
    }
    return graphqlHandler(event, context);
}

exports.handler = getHandler;

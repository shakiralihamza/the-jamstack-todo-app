import fetch from 'isomorphic-fetch';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import netlifyIdentity from "netlify-identity-widget";
import {setContext} from "apollo-link-context";

const authLink = setContext((_, {headers}) => {
        const user = netlifyIdentity.currentUser();
        // @ts-ignore
        const token = user.token.access_token;
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            }
        }
    }
);

const httpLink = new HttpLink({
    uri: '/.netlify/functions/fauna-graphql',
    fetch
});
const client = new ApolloClient({
    cache: new InMemoryCache(),
    // @ts-ignore
    link: authLink.concat(httpLink)
});

export default client;

import {
    ApolloClient,
    InMemoryCache,

} from '@apollo/client';


export const client=new ApolloClient({
    uri:import.meta.env.VITE_SERVER_API_URI,
    cache:new InMemoryCache(),
});
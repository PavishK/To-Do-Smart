import express from 'express';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

import {resolvers} from './schema/resolvers.js';
import {typeDefs} from './schema/typeDefs.js';

import dotenv from 'dotenv';
dotenv.config();

async function Server() {
    const app=express();
    app.use(cors())
    app.use(express.json());

    const server=new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();

    app.use('/graphQl',expressMiddleware(server));

    app.listen(8080,()=>console.log("Server Running..."))
    
}

Server();
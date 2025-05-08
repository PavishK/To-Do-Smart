import {gql} from 'graphql-tag';

export const typeDefs=gql`

    input ToDoListTypes{
        checked:Boolean!,
        todo:String!,
    }

    type Query{
        data:String!
    }

    type Mutation{
        getToDoList(lists:[ToDoListTypes!]!):String
    }
`;
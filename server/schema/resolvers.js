import {MakeCalculation} from '../controllers/AICalculation.js';

export const resolvers={
    Query:{
         data:()=>"Hello World! ☺️"
    },

    Mutation:{
        getToDoList:(_,{lists})=>MakeCalculation(lists)
    }
}
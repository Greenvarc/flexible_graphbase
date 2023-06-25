import { GraphQLClient } from "graphql-request"

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAPHBASE_API_URL || '' : ' http://127.0.0.1:4000/graphql'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAPHBASE_API_kEY || '' : '1234';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client =new GraphQLClient(apiUrl) // ('apiurl')

const makeGraphQlRequest = async (query: string, variables = {})=>{
    try {
        // client.request ...9client con to db
        return await client.request(query, variables);
        
    } catch (error) {
        throw error;
    }
}

export const getUser = (email: string) => {
    return makeGraphQlRequest('');
}
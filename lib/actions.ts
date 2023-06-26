import { GraphQLClient } from "graphql-request";

import { ProjectForm } from "@/common.types";
import { getUserQuery } from "@/graphql";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);


const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        // get client from db
      return await client.request(query, variables);
    } catch (err) {
      throw err;
    }
  };
  export const getUser = (email: string) => {
    //client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
  };
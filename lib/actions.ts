import { GraphQLClient } from "graphql-request";

import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { json } from "stream/consumers";

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
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
  };
  
//create user
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };
  
  return makeGraphQLRequest(createUserMutation, variables);
};

//get token func

export const fetchToken = async () => {
  try {
    //this func by default return user token
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error
  }
}

//upload image to cloud(cloudunary)
export const UploadImage = async(imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath })
    })
    //return published image url
    return response.json();
  } catch (error) {
    throw error;
  }
}

//project creation

export const createNewProject = async (form: ProjectForm,creatorId:string,token:string) => {
  const imageUrl = await UploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization",`Bearer ${token}`)// for having permission to submit
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link:creatorId,
        }
      }
    }
    return makeGraphQLRequest(createProjectMutation,variables)
  }
}

//fetch all projects
export const fetchAllProjects = async(category?:string,endCursor?:string) =>{
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(projectsQuery,{category,endCursor})
}
//get project details
export const getProjecDectails = (id:string) => {
  client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, { id });
}

//get user related project
export const getUserProjects = (id: string,last?:number) => {
  client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, { id,last });
}

//delete project
export const deleteProject = (id: string,token:string) => {
  client.setHeader("Authorization",`Bearer ${token}`)// get authorization to delete project
  return makeGraphQLRequest(deleteProjectMutation, { id });
}

//update project
export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
  //check string is base64
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }
  let updatedForm = { ...form };
  const isUploadingNewImage = isBase64DataURL(form.image);
  if (isUploadingNewImage) {
    const imageUrl = await UploadImage(form.image)
    //if uploaded to cloudy
    if (imageUrl.url) {
      updatedForm = {
        ...form,
        image:imageUrl.url
      }
    }
  }
  const variables = {
    id: projectId,
    input:updatedForm
  }
  client.setHeader("Authorization",`Bearer ${token}`)// get authorization to update project
  return makeGraphQLRequest(updateProjectMutation, variables);
}
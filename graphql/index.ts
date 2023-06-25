export const getUserQuery = `
query GetUser($email:string!){
    user(by:{email:$email}){
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedinUrl
    }
}
`
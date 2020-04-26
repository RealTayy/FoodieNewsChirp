import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation addUser($username: String!){
    insert_user_table(
      objects: [
        { username: $username}
      ]
    ) {
      returning {
        id
        username
      }
    }
  }
`;
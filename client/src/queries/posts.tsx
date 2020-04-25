import gql from 'graphql-tag';

export const GET_POST_ALL = gql`
  query {
    post_table(order_by: {created_at: desc}) {
      author_id
      created_at
      id
      title
      url
      score
      liked
      disliked
      description
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!){    
    post_table(where: {id: {_eq: $id}}){      
      author_id
      created_at
      id
      title
      url
      score
      liked
      disliked
      description
    }    
  }
`;

export const ADD_POST = gql`
  mutation addPost($author_id: Int!, $title: String!, $url: String!, $description: String!) {
    insert_post_table(
      objects: [
        {
        author_id: 11,
        title: "Ant Design",
        url: "https://ant.design/",
        description: "UI Component Library"
        }
      ]
    ){
      returning {
        author_id
        created_at
        id
        title
        url
        disliked
        liked              
        description
      }
    }
  }
`;

export const UPDATE_POST_LIKES = gql`
mutation updatePost($id: Int!, $liked: Int!, $disliked: Int!) {
  update_post_table(
    where: {id: {_eq: $id}},
    _set:{
      liked: $liked,
      disliked: $disliked
    }
  ){
    returning {
      author_id
      created_at
      id
      title
      url
      disliked
      liked
      score
      description
    }
  }
}
`;

// import { useQuery, useMutation } from '@apollo/react-hooks';
// // import { GET_POST_ALL, GET_POST_BY_ID, ADD_POST } from '../queries/posts';
// console.log("GET_POST_ALL", useQuery(GET_POST_ALL))
// console.log("GET_POST_BY_ID", useQuery(
//   GET_POST_BY_ID, {
//   variables: { id: 2 }
// }
// ))
// const [addPost, { data }] = useMutation(ADD_POST);
// console.log(addPost({
//   variables: {
//     author_id: 1,
//     title: "From React App",
//     url: "www.sup.com"
//   }
// }));
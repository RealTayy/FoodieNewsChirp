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
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: Int!){    
    post_table(where: {id: {_eq: $id}}){      
      author_id
      created_at
      id
      title
      url
      score
      liked
      disliked
    }    
  }
`;

export const ADD_POST = gql`
  mutation AddPost($author_id: Int!, $title: String!, $url: String!) {
    insert_post_table(objects: [{author_id: 11, title: "Hello", url: "Hehe"}]) {
      returning {
        id
        author_id
        title
        url
        created_at        
      }
    }
  }
`;

export const UPDATE_POST_LIKES = gql`
mutation update_post($id: Int!, $liked: Int!, $disliked: Int!) {
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
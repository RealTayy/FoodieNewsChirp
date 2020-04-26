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
      comments
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
      comments
    }    
  }
`;

export const ADD_POST = gql`
  mutation addPost($author_id: String!, $title: String!, $url: String!, $description: String!) {
    insert_post_table(
      objects: [
        {
        author_id: $author_id,
        title: $title,
        url: $url,
        description: $description
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
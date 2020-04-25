import gql from 'graphql-tag';

export const GET_COMMENT_BY_POST_ID = gql`
  query getCommentByPostId($id: Int!){    
    comment_table(where: {id: {_eq: $id}}){
      id
      post_id
      author_id
      created_at
      liked
      disliked
      comment
      parent_comment_id
    }    
  }
`;

export const ADD_POST = gql`
  mutation addPost($author_id: Int!, $title: String!, $url: String!, $description: String!) {
    insert_comment_table(
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
  update_comment_table(
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
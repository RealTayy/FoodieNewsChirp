import gql from 'graphql-tag';

export const GET_COMMENT_BY_POST_ID = gql`
  query getCommentByPostId($id: Int!){    
    comment_table(where: {post_id: {_eq: $id}},order_by: {created_at: asc}){
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

export const ADD_COMMENT = gql`
  mutation addPost(
      $comment: String!,
      $parent_comment_id: Int,
      $author_id: String!,
      $post_id: Int!,
  ) {
    insert_comment_table(
      objects: [
        {
        comment: $comment,
        parent_comment_id: $parent_comment_id,
        author_id: $author_id,        
        post_id: $post_id
        }
      ]
  ) {
    returning {
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
  }
`;
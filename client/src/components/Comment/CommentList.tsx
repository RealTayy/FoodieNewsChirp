import React from 'react'
import { FormCreateComment } from '../../components/Form';
import './CommentList.scss'
import { PageHeader } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMMENT_BY_POST_ID } from '../../queries/comments';


const CommentList = ({ postId }: any) => {
  const { loading, data, error } = useQuery(GET_COMMENT_BY_POST_ID, { variables: { id: postId } });
  // TODO: Loading Component
  if (loading) return <div>
    Loading Post:{postId}.
  </div>

  // TODO: Error Component
  if (error) return <div>
    Error.
  </div>

  console.log(data);
  const { comment_table } = data;
  const [commentData] = comment_table;

  return (
    <div className="CommentList">
      <PageHeader
        className="CommentList__header"
        title="Comment(s)"
      />
      <hr style={{ opacity: .2 }} />
      <FormCreateComment
        className="CommentList__createComment"
        postId={postId}
      />
      <hr style={{ opacity: .2 }} />
      {!commentData ? <PageHeader
        style={{ padding: "0px" }}
        title="No comments yet."
      >
        it's looking a little quiet in here... Be the first one to leave a comment!
      </PageHeader>
        : "There be comments"}

    </div>
  )
}

export default CommentList
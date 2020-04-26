import React, { useContext } from 'react'
import { FormCreateComment } from '../../components/Form';
import './CommentList.scss'
import { PageHeader } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMMENT_BY_POST_ID } from '../../queries/comments';
import CommentListItem from './CommentListItem';
import { List } from 'antd';

// TODO: Proper TS Typing
const CommentList = ({ postId }: any) => {
  const { loading, data, error, refetch } = useQuery(
    GET_COMMENT_BY_POST_ID,
    {
      variables: { id: postId },
    });

  // TODO: Loading Component
  if (loading) return <div>
    Loading Post:{postId}.
  </div>

  // TODO: Error Component
  if (error) return <div>
    Error.
  </div>

  // Re-order comments and add indentation to them for nested comments
  const createNestedComments: any = (comments: any) => {
    if (comments.length === 0) return [];
    const commentCopy = [...comments];
    let nestedComments: any = [];
    commentCopy.forEach((comment) => {
      const found = nestedComments.findIndex((c: any) => {
        return comment.parent_comment_id === c.id;
      })
      // If comment is a root level comment and has no parent comment
      if (found === -1) {
        // Give comment indent level of 0 and put at beginning of array
        comment = { indent: 0, ...comment }
        nestedComments.unshift(comment)
      }
      // Else comment has a parent
      else {
        // give comment indent level of parent + 1
        comment = { indent: nestedComments[found].indent + 1, ...comment }
        // insert comment after parent
        nestedComments.splice(found + 1, 0, comment);
      }
    });
    return nestedComments;

  }

  const test = createNestedComments(data.comment_table);

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
        refetch={refetch}
      />
      <hr style={{ opacity: .2, marginBottom: "0px" }} />
      {!data.comment_table.length ? <PageHeader
        style={{ padding: "0px" }}
        title="No comments yet."
      >
        it's looking a little quiet in here... Be the first one to leave a comment!
      </PageHeader>
        :
        <List
          itemLayout="horizontal"
          dataSource={test}
          renderItem={comment => <CommentListItem comment={comment} refetch={refetch} />}
        />
      }
    </div>
  )
}

export default CommentList
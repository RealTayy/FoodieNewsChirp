import React from 'react'
import { List, Avatar } from 'antd';
import moment from 'moment'

import './CommentListItem.scss'
// TODO: Proper TS Typing
const CommentListItem = ({ comment, refetch }: any) => {
  console.log(comment);
  return (
    <List.Item className="CommentListItem">
      <List.Item.Meta
        title={<>
          {comment.author_id + " "}
          <span className="CommentListItem__date">
            {moment(comment.created_at).format("YYYY-MM-DD (LT)")}
          </span>
        </>}
        description={comment.comment}
      />
    </List.Item>

  )
}

export default CommentListItem

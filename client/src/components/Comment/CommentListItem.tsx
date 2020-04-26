import React, { useState } from 'react'
import { List } from 'antd';
import moment from 'moment'

import './CommentListItem.scss'
import { FormCreateComment } from '../Form';
// TODO: Proper TS Typing
const CommentListItem = ({ comment, refetch }: any) => {
  const [formExpanded, setFormExpanded] = useState(true)
  return (<>
    <List.Item className="CommentListItem">
      <List.Item.Meta
        title={<>
          [{comment.author_id + "] "}
          <span className="CommentListItem__date">
            {moment(comment.created_at).format("YYYY-MM-DD (LT)")}
          </span>
        </>}
        description={comment.comment}
      />
      {/* {formExpanded && <FormCreateComment
      className="CommentListItem__form"
        postId={comment.post_id}
        parentCommentId={comment.id}
      />} */}
    </List.Item>

  </>

  )
}

export default CommentListItem

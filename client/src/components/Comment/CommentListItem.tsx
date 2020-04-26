import React, { useState } from 'react'
import { List, Button } from 'antd';
import moment from 'moment'

import './CommentListItem.scss'
import { FormCreateComment } from '../Form';
// TODO: Proper TS Typing
const CommentListItem = ({ comment, refetch }: any) => {
  const [formExpanded, setFormExpanded] = useState(false)
  return (<>
    <List.Item className="CommentListItem" style={{
      marginLeft: `${comment.indent * 16}px`,
    }}>
      <div className="CommentListItem__content">
        <List.Item.Meta
          title={<>
            [{comment.author_id + "] "}
            <span className="CommentListItem__date">
              {moment(comment.created_at).format("YYYY-MM-DD (LT)")}
            </span>
          </>}
          description={comment.comment}
        />
        {!formExpanded &&
          <Button className="CommentListItem__replyBtn" type="primary" size={"small"} onClick={() => {
            setFormExpanded(true)
          }}>Reply</Button>
        }
      </div>
      {formExpanded && <FormCreateComment
        className="CommentListItem__form"
        postId={comment.post_id}
        parentCommentId={comment.id}
        refetch={refetch}
        setFormExpanded={setFormExpanded}
      />}
    </List.Item>

  </>

  )
}

export default CommentListItem

import React, { useState, useContext } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../queries/comments';
import classnames from 'classnames';
import SessionContext from '../../SessionContext';


// TODO: Used in both form components. Export to seperate component.
const openNotificationWithIcon = (type: "info" | "error" | "success", title: string) => {
  notification[type]({
    message: title,
    duration: type === "info" ? 1 : 3.5
  });
};

const FormCreateComment = ({ className, postId, refetch, parentCommentId, setFormExpanded }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addComment] = useMutation(ADD_COMMENT);
  const [form] = Form.useForm();
  const { username } = useContext(SessionContext);

  // TODO: Proper TS Typing
  const onFinishHandler = async (comment: any) => {
    comment = {
      variables: {
        post_id: postId,
        author_id: username(),
        parent_comment_id: parentCommentId || null,
        ...comment.variables
      }
    }
    setIsSubmitting(true);
    await addComment(comment);
    form.resetFields();
    setIsSubmitting(false);
    refetch();
    if (setFormExpanded) setFormExpanded(false);
    openNotificationWithIcon('success', "Submitted!");
  }

  return (
    <Form
      form={form}
      className={classnames("FormCreateComment", className)}
      name="create-comment"
      onFinish={onFinishHandler}
      layout="vertical"
    >
      <Form.Item
        name={['variables', 'comment']}
        label={parentCommentId ? '' : "Leave a comment"}
        rules={[{ required: true, message: "Comment cannot be empty!" }]}
      >
        <Input.TextArea
          placeholder="Enter Comment"
        />
      </Form.Item>
      <Form.Item
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
        >
          {parentCommentId ? "Reply to comment " : "Submit comment"}
        </Button>
        {setFormExpanded &&
          <Button
            style={{ marginLeft: "12px" }}
            onClick={() => {
              setFormExpanded(false)
            }}>
            Cancel
            </Button>
        }
      </Form.Item>
    </Form>
  )
}

export default FormCreateComment

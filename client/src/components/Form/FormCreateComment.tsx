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

const FormCreateComment = ({ className, postId, refetch, parentCommentId }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addComment] = useMutation(ADD_COMMENT);
  const [form] = Form.useForm();
  const { username } = useContext(SessionContext);

  console.log(parentCommentId);

  // TODO: Proper TS Typing
  const onFinishHandler = async (comment: any) => {
    comment = {
      variables: {
        post_id: postId,
        author_id: username(),
        parent_comment_id: null,
        ...comment.variables
      }
    }
    setIsSubmitting(true);
    await addComment(comment);
    form.resetFields();
    setIsSubmitting(false);
    refetch();
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
        label={"Leave a comment"}
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
          Submit comment
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormCreateComment

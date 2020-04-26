import React, { useState, useContext } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { useMutation } from '@apollo/react-hooks';
import { ADD_POST } from '../../queries/posts';
import './FormCreatePost.scss'
import { RouteComponentProps, withRouter } from "react-router-dom";
import SessionContext from '../../SessionContext';

// Helper that uses REGEX that validates if valid URL format
const validateUrlFormat = (value: string) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

// TODO: Used in both form components. Export to seperate component.
const openNotificationWithIcon = (type: "info" | "error" | "success", title: string) => {
  notification[type]({
    message: title,
    duration: type === "info" ? 1 : 3.5
  });
};

const FormCreatePost = ({ history }: RouteComponentProps) => {
  // TODO: Proper TS Typing
  const { username } = useContext(SessionContext);
  const [title, setTitle] = useState<any>({ value: '', touched: false })
  const [url, setUrl] = useState<any>({ value: '', touched: false })
  const [userName, setUserName] = useState<any>({ value: username(), touched: false })
  const [submitTouched, setSubmitTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addPost] = useMutation(ADD_POST);

  // TODO: Proper TS Typing
  // Validations
  const validateUsername = (title: any) => {
    if (title) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
  }

  const validateTitle = (title: any) => {
    if (title) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
  }

  const validateUrl = (url: any) => {
    if (submitTouched && !validateUrlFormat(url)) {
      return {
        validateStatus: 'error',
        errorMsg: 'URL must be in valid format | example: https://www.google.com/',
      }
    }
    if (url) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
  }

  // Handlers
  const onUsernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserName({ ...validateUsername(value), value, touched: true })
  }

  const onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle({ ...validateTitle(value), value, touched: true })
  }

  const onUrlChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUrl({ ...validateUrl(value), value, touched: true })
  }

  // TODO: Proper TS Typing
  const onFinishHandler = async (post: any) => {
    // TODO: Clean up this validation logic. Honestly this entire function.
    setSubmitTouched(true)
    if (!validateUrlFormat(url.value)) return setUrl({ ...validateUrl(url.value), value: url.value, touched: true })
    if (title.validateStatus === 'error') return
    if (!title.value) return
    if (url.validateStatus === 'error') return
    if (!url.value) return

    setIsSubmitting(true);
    openNotificationWithIcon('info', "Submitting...");
    const postData = await addPost(post);
    setIsSubmitting(false);
    openNotificationWithIcon('success', "Submitted!");

    const id = postData.data.insert_post_table.returning[0].id;
    history.push(`/post-thread/${id}`);
  }


  return (
    <Form
      className="FormCreatePost"
      name="create-post"
      onFinish={onFinishHandler}
      layout="vertical"
      initialValues={
        {
          variables: {
            author_id: username()
          }
        }
      }
    >
      <Form.Item
        name={['variables', 'author_id']}
        label="Username"
        validateStatus={userName.validateStatus}
        help={userName.errorMsg}
        rules={[{ required: true, message: "Username is required" }]}
      >
        <Input placeholder="Enter Username" value={userName.value} onChange={onUsernameChangeHandler} />
      </Form.Item>
      <Form.Item
        name={['variables', 'title']}
        label="Title"
        validateStatus={title.validateStatus}
        help={title.errorMsg}
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Enter Title" value={title.value} onChange={onTitleChangeHandler} />
      </Form.Item>
      <Form.Item
        name={['variables', 'url']}
        label="Website URL"
        rules={[{ required: true, message: "Website URL is required" }]}
        validateStatus={url.validateStatus}
        help={url.errorMsg}
      >
        <Input placeholder="Enter Website URL" onChange={onUrlChangeHandler} />
      </Form.Item>
      <Form.Item
        name={['variables', 'description']}
        label="Description"
      >
        <Input.TextArea placeholder="Enter Description (optional)" />
      </Form.Item>
      <Form.Item
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
        >
          Submit post
        </Button>
      </Form.Item>
    </Form >
  )
}

export default withRouter(FormCreatePost);

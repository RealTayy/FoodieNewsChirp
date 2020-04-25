import React from 'react'
import { PageHeader, Button } from 'antd'
import { FormCreatePost } from '../../components/Form'
import './CreatePost.scss'

const CreatePost = () => {
  return (
    <div className="CreatePost">
      <PageHeader
        className="CreatePost__header"
        title="Submit Post"
        subTitle="Looking at your submission is making me hungry."
        ghost={false}
      />
      <FormCreatePost />
    </div>
  )
}

export default CreatePost

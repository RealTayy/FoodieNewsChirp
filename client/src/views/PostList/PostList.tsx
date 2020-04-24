import React, { Component, useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import { usePostStore } from '../../stores';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_POST_ALL, GET_POST_BY_ID, ADD_POST } from '../../queries/posts';

const PostList = observer(() => {
  const { loading, data, error } = useQuery(GET_POST_ALL);

  // TODO: Loader Component
  if (loading) return <div>
    Loading Post(s).
  </div>

  // TODO: Error Component
  if (error) return <div>
    Error.
  </div>

  const { post_table } = data;

  return (
    <div>
      Post List Page (Number of Post: {post_table.length})
    </div>
  )
})

export default PostList

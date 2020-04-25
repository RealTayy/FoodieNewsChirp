import React from 'react'
import { observer } from 'mobx-react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST_ALL } from '../../queries/posts';
import { PageHeader } from 'antd'
import List from '../../components/List';
import "./PostList.scss"

const PostList = observer(() => {
  const { loading, data, error } = useQuery(GET_POST_ALL,
    { fetchPolicy: "cache-and-network" }
  );

  React.useEffect(() => {
    // do some checking here to ensure data exist
    if (data) {
      // mutate data if you need to
      console.log(data);
    }
  }, [data])


  // TODO: Loading Component
  if (loading) return <div>
    Loading Post(s).
  </div>

  // TODO: Error Component
  if (error) return <div>
    Error.
  </div>

  const { post_table } = data;

  return (
    <div className="PostList">
      <PageHeader
        className="PostList__header"
        title="Foodie News"
        subTitle="For all your food related news!."
        ghost={false}
      // extra={[
      //   <Button key="1" type="primary">Submit Post</Button>,
      // ]}
      />
      <List items={post_table} />
    </div>
  )
})

export default PostList

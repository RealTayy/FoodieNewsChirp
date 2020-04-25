import React from 'react'
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { GET_POST_BY_ID } from '../../queries/posts';
import { PageHeader } from 'antd'
import coffee from '../../images/coffee.jpg';
import hamburger from '../../images/hamburger.jpg';
import pizza from '../../images/pizza.jpg';
import ramen from '../../images/ramen.jpg';
import tea from '../../images/tea.jpg';
import './PostThread.scss';

const iconArr = [coffee, hamburger, pizza, ramen, tea];

type TParams = { id: string };

const PostThread = ({ match }: RouteComponentProps<TParams>) => {
  const { id: queryId } = match.params;
  const { loading, data, error } = useQuery(GET_POST_BY_ID, { variables: { id: queryId } });

  // TODO: Loading Component
  if (loading) return <div>
    Loading Post:{queryId}.
  </div>

  // TODO: Error Component
  if (error) return <div>
    Error.
  </div>

  const { post_table } = data;
  const [postData] = post_table;

  // No post found by that id
  if (!postData) return <PageHeader
    className="PostList__error"
    title="Post not found."
    subTitle="This is awkward..."
    ghost={false}
  />

  const {
    author_id,
    created_at,
    description,
    disliked,
    id,
    liked,
    score,
    title,
    url,
  } = postData;

  return (
    <div className="PostThread">
      <PageHeader
        className="PostList__header"
        title="Foodie News"
        subTitle="For all your food related news!."
        ghost={false}
      />
      PostThread View (id: {id})
    </div>
  )
}

export default PostThread

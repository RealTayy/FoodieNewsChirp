import React from 'react'
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { GET_POST_BY_ID } from '../../queries/posts';
import { PageHeader } from 'antd';
import coffee from '../../images/coffee.jpg';
import hamburger from '../../images/hamburger.jpg';
import pizza from '../../images/pizza.jpg';
import ramen from '../../images/ramen.jpg';
import tea from '../../images/tea.jpg';
import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_POST_LIKES } from '../../queries/posts';
import Infobox from '../../components/Infobox';
import './PostThread.scss';
import { CommentList } from '../../components/Comment';

const iconArr = [coffee, hamburger, pizza, ramen, tea];

type TParams = { id: string };

// TODO: Proper TS Typing
// TODO: Seperate reused component into it's own file
const IconText = ({ icon, text, onClick }: any) => (
  <span onClick={onClick}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

// TODO: Proper TS Typing
const onLikeHandler = (mutation: Function, { id, liked, disliked }: any) => {
  mutation({
    variables: {
      id: id,
      liked: liked + 1,
      disliked: disliked
    }
  })
}

// TODO: Proper TS Typing
const onDislikeHandler = (mutation: Function, { id, liked, disliked }: any) => {
  mutation({
    variables: {
      id: id,
      liked: liked,
      disliked: disliked + 1
    }
  })
}

const PostThread = ({ match }: RouteComponentProps<TParams>) => {
  const [updatePostLikes] = useMutation(UPDATE_POST_LIKES);
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
    description,
    disliked,
    id,
    liked,
    title,
    url,
  } = postData;

  return (
    <div className="PostThread">
      <PageHeader
        className={"PostThread__header"}
        title={
          <a className="PostThread__header-title" href={url} target="_blank">
            {title}
          </a>
        }
        subTitle={
          <a className="PostThread__header-subTitle" href={url} target="_blank">
            ({url})
          </a>
        }
        ghost={false}
        avatar={{ src: iconArr[id % 5], size: "large" }}
        extra={[
          // TODO: Seperate reused component into it's own file
          <IconText
            icon={LikeTwoTone}
            text={liked}
            key="list-vertical-like-o"
            onClick={() => onLikeHandler(updatePostLikes, postData)}
          />,
          <IconText
            icon={DislikeTwoTone}
            text={`-${disliked}`}
            key="list-vertical-dislike-o"
            onClick={() => onDislikeHandler(updatePostLikes, postData)}
          />,
        ]}>
        {description && <>
          <div className="PostThread__description">
            <hr />
            {description}
          </div>
        </>}
      </PageHeader>
      <Infobox className="PostThread__info" post={postData} />
      <CommentList postId={id} />
    </div>
  )
}

export default PostThread

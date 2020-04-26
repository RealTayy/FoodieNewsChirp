import React from 'react'
import { List as AntList, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import coffee from '../../images/coffee.jpg';
import hamburger from '../../images/hamburger.jpg';
import pizza from '../../images/pizza.jpg';
import ramen from '../../images/ramen.jpg';
import tea from '../../images/tea.jpg';
import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_POST_LIKES } from '../../queries/posts';
import './ListItem.scss'

const iconArr = [coffee, hamburger, pizza, ramen, tea];
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

// TODO: Proper TS Typing
// TODO: Seperate reused component into it's own file
const IconText = ({ icon, text, onClick }: any) => (
  <span onClick={onClick}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

// TODO: Proper TS Typing
export const ListItem = ({ item }: any) => {
  const [updatePostLikes] = useMutation(UPDATE_POST_LIKES);
  return <AntList.Item
    className="ListItem"
    actions={[
      <IconText
        icon={LikeTwoTone}
        text={item.liked}
        key="list-vertical-like-o"
        onClick={() => onLikeHandler(updatePostLikes, item)}
      />,
      <IconText
        icon={DislikeTwoTone}
        text={`-${item.disliked}`}
        key="list-vertical-dislike-o"
        onClick={() => onDislikeHandler(updatePostLikes, item)}
      />,
    ]}>
    <AntList.Item.Meta
      avatar={
        <Link to={`/post-thread/${item.id}`}>
          <Avatar size="large" src={iconArr[item.id % 5]} />
        </Link>
      }
      title={<>
        <Link to={`/post-thread/${item.id}`}>
          {`${item.title} `}
        </Link>
        <a className="ListItem__title-link" href={item.url} target="_blank">
          ({item.url})
        </a>
      </>}
      description={<>
        <span>Score: {item.score} | </span>
        <span>Submitted By: {item.author_id || "Anon"} | </span>
        <span>Comments: {item.comments} | </span>
        <span>Created At: {moment(item.created_at).format("YYYY-MM-DD (LT)")}</span>
      </>}
    />
  </AntList.Item >
}

import React from 'react'
import moment from 'moment'


// TODO: Proper TS Typing
const Infobox = ({ post }: any) => {
  const { score, author_id, created_at } = post;
  return (
    <div className="Infobox">
      <div className="PostThread__info">
        <span className="PostThread__info-item">Score: {score} | </span>
        <span className="PostThread__info-item">Submitted By: {author_id} | </span>
        <span className="PostThread__info-item">Comments: {"TODO"} | </span>
        <span className="PostThread__info-item">Created At: {moment(created_at).format("YYYY-MM-DD (LT)")}</span>
      </div>
    </div>
  )
}

export default Infobox

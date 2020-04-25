import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import './Infobox.scss'

// TODO: Proper TS Typing
const Infobox = ({ post, className }: any) => {
  const { score, author_id, created_at } = post;
  return (
    <div className={classnames("Infobox", className)}>
      <span className="Infobox__item">Score: {score} | </span>
      <span className="Infobox__item">Submitted By: {author_id} | </span>
      <span className="Infobox__item">Comments: {"TODO"} | </span>
      <span className="Infobox__item">Created At: {moment(created_at).format("YYYY-MM-DD (LT)")}</span>
    </div>
  )
}

export default Infobox

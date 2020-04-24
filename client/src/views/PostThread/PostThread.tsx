import React from 'react'
import { RouteComponentProps } from "react-router-dom";

type TParams = { id: string };

const PostThread = ({ match }: RouteComponentProps<TParams>) => {
  return (
    <div className="PostThread">
      PostThread View (id: {match.params.id})
    </div>
  )
}

export default PostThread

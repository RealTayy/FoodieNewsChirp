import React from 'react'
import { List as AntList, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import hamburgerIcon from '../../images/icon-hamburger.jpg';
import './List.scss'

// TODO: Proper TS Typing
const List = ({ items }: any) => {
  return (
    <AntList
      className="List"
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item: any) => {
        console.log(item);
        return <AntList.Item>
          <AntList.Item.Meta
            avatar={<Avatar src={hamburgerIcon} />}
            title={<>
              <Link to={`/post-thread/${item.id}`}>
                {`${item.title} `}
              </Link>
              <a href={item.url}>
                ({item.url})
              </a>
            </>}
            description={`Author: ${item.author_id} | Created at: ${item.created_at}`}
          />
        </AntList.Item>
      }
      }
    />
  )
}

export default List

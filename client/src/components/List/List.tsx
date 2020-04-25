import React from 'react'
import { List as AntList } from 'antd';
import { ListItem } from './ListItem';
import './List.scss'

// TODO: Proper TS Typing
const List = ({ items }: any) => {
  return (
    <AntList
      className="List"
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item: any) => {
        return <ListItem item={item} />
      }}
    />
  )
}

export default List

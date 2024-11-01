import React from 'react'
import ContentPost from '../ContentpostContainer/ContentPost'
import Feed from '../PostContainer/Feed'
import Rightbar from '../RightpostContainer/Rightbar'

const MainPost = ({socket}) => {
  return (
    <>
      <ContentPost /> 
      <Feed socket={socket}/>
    </>
  )
}
export default MainPost;
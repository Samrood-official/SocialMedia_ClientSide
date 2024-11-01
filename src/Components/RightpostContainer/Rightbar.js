import React, { useEffect, useState } from 'react'
import FriendInfo from '../smallComponants/FriendInfo'
import { useDispatch, useSelector } from 'react-redux'
import { suggessions } from '../../utils/constants'
import axios from '../../utils/axios'
import { setAllUsers } from '../../state/userReducer'

const Rightbar = () => {
  // const [render, setRender]= useState(false)
  const token = useSelector((state) => state.token)
  const users = useSelector((state)=>state.users)
  const dispatch = useDispatch()
  const fetchUsers = () => {
    axios.get(suggessions, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      dispatch(setAllUsers({users:response.data.data}))
    }).catch((err)=>{
      console.log(err); 
    })
  }
  useEffect(() => {
    fetchUsers()
  },[])
  return (
    <>
        <div className="p-2 rounded-lg">
          <h1 className="text-md bg-white rounded-md p-2 font-bold mb-4">Suggested for you</h1>
          <ul className='overflow-y-scroll hide-scrollbar max-h-[25rem] '>
            {users?.map((user)=>(
            <li className="py-2 px-1" key={user._id}>
              <FriendInfo name={user.name} key={user._id}  id={user._id} userName={user.userName} profilePic={user.profilePic} />
            </li>
            ))}
          </ul>
        </div>
    </>

  )
}

export default Rightbar
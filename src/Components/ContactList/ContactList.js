import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { getUser } from '../../state/apiCalls';

const ContactList = ({ conversation, currentUser }) => {
  const currentChat = useSelector((state)=>state.currentChat)
  const token = useSelector((state) => state.token)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    const getUserInfo = async () => {
      const response = await getUser(token,friendId)
      setUser(response)
    }
    getUserInfo()
  },[currentUser,conversation])
  return (
    <div className={`flex items-center justify-start space-x-4 p-2 my-1 ${conversation?._id === currentChat?._id && 'border border-[#3d3f50]'} bg-white  border rounded-md`}>
      {user?.profilePic ?
        <img className='w-10 h-10 rounded-full' src={user?.profilePic} alt='profilepic' /> :
        <div className='border border-[#3d3f50] md:mx-0 w-10 h-10 rounded-full'>
          <FaUser className='w-full h-full rounded-full' /> 
        </div>
      }
      <div>
        <h3 className="text-xs md:text-lg font-medium text-gray-700">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.userName}</p>
      </div>
    </div>
  )
}

export default ContactList
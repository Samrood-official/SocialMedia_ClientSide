import React from 'react'
import { useSelector } from 'react-redux'
import { imageUrl } from '../../icons/icons'
import { useNavigate } from 'react-router-dom'

export const UserProfileLink = () => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    return (
        <div className='flex gap-3 items-center pl-1 py-2 rounded-md font-sans cursor-pointer'
            onClick={() => navigate(`/profile/${user?._id}`)}
        >
            <img className='rounded-full w-10 h-10' src={user?.profilePic || imageUrl} />
            <p>{user?.userName}</p>
        </div>
    )
}

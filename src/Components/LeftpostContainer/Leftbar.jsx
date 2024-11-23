import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setLogout } from '../../state/userReducer';
import { persistor } from '../../state/store';
import { FaHome } from 'react-icons/fa'
import { MdNotifications } from 'react-icons/md';
import { SiGooglemessages } from 'react-icons/si';
import { UserProfileLink } from '../UserProfileLink/UserProfileLink';
import { ImProfile } from "react-icons/im";

const sideMenu = [
  {
    name: 'Home',
    icon: <FaHome className='w-full h-full rounded-full' />,
    path:'/',
  },
  {
    name: 'Profile',
    icon: <ImProfile className='w-full h-full '/>,
  },
  {
    name: 'Messages',
    icon: <SiGooglemessages className='w-full h-full rounded-full' />,
    path: '/chat',
  },
  {
    name: 'Notifications',
    icon: <MdNotifications className='w-full h-full rounded-full' />,
    path: '/notifications',
  },
]

const Leftbar = () => {
  // Get the user data from the Redux store
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const active = "bg-[#e3e3e3]"
  const activehover = "bg-green-700 "

  return (
    <>
        <UserProfileLink userData={userData} />
        {sideMenu.map((menu, index) => (
          <Link 
          key={index} 
          className={`flex gap-3 items-center m-2 p-2 rounded-md cursor-pointer ${location.pathname === menu.path && 'bg-[#e3e3e3]'}  hover:bg-[#e3e3e3] font-sans`}

          to={menu.name === 'Profile' ? `/profile/${userData?._id}` : menu.path}
                >
            <div className=' w-6 h-6'>
              {menu.icon}
            </div>  
            <p className='text-sm'>{menu.name}</p>
          </Link>
        ))}

        <div className='p-4 border-t border-gray-700'>
          <p
            onClick={() => {

              dispatch(setLogout())
              persistor.purge();
              navigate('/')
            }}
          >
            Logout
          </p>
        </div>
    </>

  )
}

export default Leftbar

import React from 'react'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import MainPost from '../../Components/MainpostContainer/MainPost'
import Navbar from '../../Components/Navbar/Navbar'
import Rightbar from '../../Components/RightpostContainer/Rightbar'
import { FaHome, FaUserFriends } from 'react-icons/fa'
import { SiGooglemessages } from "react-icons/si";
import { MdNotifications, MdOutlinePhotoLibrary } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

// import Sample from '../../Pages/Sample' 
const Home = () => {

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 mx-auto h-[calc(100vh-64px)]">
        <div className='hidden md:block col-span-1 overflow-scroll'>

          <Leftbar />
        </div>
        <div className='md:col-span-2 overflow-scroll hide-scrollbar'>
          <MainPost />
        </div>
        <div className='md:col-span-1'>
          {/* // <div className="hidden md:block w-1/4 p-2 relative "> */}
          <Rightbar />
        </div>
      </section>
    </>
  )
}

export default Home
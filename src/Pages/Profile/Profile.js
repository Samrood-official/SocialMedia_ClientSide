import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileMainPost from '../../Components/ProfileMainpostContainer/ProfileMainPost'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
const Profile = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 mx-auto h-[calc(100vh-64px)]">
      <div className='hidden md:block col-span-1 overflow-scroll'>
        <Leftbar />
      </div>
      <div className='md:col-span-3 overflow-scroll'>
        <ProfileMainPost />
      </div>
    </section>
  )
}

export default Profile
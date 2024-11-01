import React from 'react'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import MainPost from '../../Components/MainpostContainer/MainPost'
import Rightbar from '../../Components/RightpostContainer/Rightbar'

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
          <Rightbar />
        </div>
      </section>
    </>
  )
}

export default Home
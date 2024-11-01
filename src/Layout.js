import React from 'react'
import Navbar from './Components/Navbar/Navbar';

const Layout = ({children}) => {
    console.log("🚀 ~ Layout ~ childrens:")
    return (
        <div className='bg-[#f0f2f5] min-h-screen'>
            <Navbar />  
            {children}
        </div>
    )
}

export default Layout;
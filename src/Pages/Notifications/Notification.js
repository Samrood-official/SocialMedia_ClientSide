import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import { getNotifications } from '../../state/apiCalls'
import Notificationlist from './Notificationlist'
const Notification = () => {
    const token = useSelector((state) => state.token)
    const [notification, setNotification] = useState([])

    useEffect(() => {
        const fetchNotification = async () => {
            const response = await getNotifications(token)
            setNotification(response)
        }

        fetchNotification()
    }, [token])
    
    return (
        <>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 mx-auto h-[calc(100vh-64px)]">
                <div className='hidden md:block col-span-1 overflow-scroll'>
                    <Leftbar />
                </div>
                <div className='md:col-span-3 overflow-scroll'>
                    <div className="bg-white rounded-md shadow-md  ">
                        <div className='p-4 overflow-y-scroll overflow scrollbar-hide'>

                            {notification.length !== 0 ? notification.map(({ type, user, friend, content, postId, createdAt }, index) => (
                                <React.Fragment key={index}>
                                    <Notificationlist type={type} createdAt={createdAt} user={user} friend={friend} content={content} post={postId} />
                                </React.Fragment>
                            )) : <div className='p-28 text-2xl font-semibold'>No Notifications</div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notification
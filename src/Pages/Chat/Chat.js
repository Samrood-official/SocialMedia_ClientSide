import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Contact from '../../Components/Contact/Contact'
import ChatContainer from '../../Components/ChatContainer/ChatContainer'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import { useDispatch, useSelector } from 'react-redux'
import { conversations } from '../../utils/constants'
import axios from '../../utils/axios';
import { setConversation } from '../../state/userReducer'

const Chat = () => {
    let currentChat = useSelector((state) => state.currentChat)
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const chat = useSelector((state) => state.chat)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`${conversations}/${user._id}`, {
                    'Authorization': `barear ${token}`
                })
                dispatch(setConversation(response.data))
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
    }, [user, token])

    useEffect(() => {
        const getMessages = async () => {
            const response = await axios.get(`/api/messages/${currentChat?._id}`)
            setMessages(response.data)
        }
        currentChat && getMessages();
    }, [currentChat])
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 mx-auto h-[calc(100vh-64px)]">
                <div className='hidden md:block col-span-1 overflow-scroll'>
                    <Leftbar />
                </div>
                <div className={`md:col-span-1 md:block ${chat.showContact} overflow-scroll`}>
                    <div className={`h-full w-full p-4 md:block`}>
                        <Contact currentUser={user} />
                    </div>
                </div>
                <div className={`md:col-span-2 overflow-scroll h-full ${chat.showMessage} md:block`}>
                    {currentChat ?
                        <ChatContainer messages={messages} setMessages={setMessages} currentChat={currentChat} /> :
                        <div className='bg-white m-5'><div className=' p-24 text-2xl italic'>open a chat to start a conversation</div></div>
                    }
                </div>
            </section>
        </>
    )
}

export default Chat
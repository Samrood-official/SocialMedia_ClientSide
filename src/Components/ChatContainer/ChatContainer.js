import React, { useEffect, useRef, useState } from 'react';
import ChatBox from '../ChatBox/ChatBox';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';
import io from 'socket.io-client';
import { getUser } from '../../state/apiCalls';
import { imageUrl, SubmitIcon } from '../../icons/icons';
import { BiArrowBack } from 'react-icons/bi';
import { setChat } from '../../state/userReducer';
import { getBaseUrl } from '../../utils/constants';

const url = getBaseUrl(true)
const socket = io.connect(url)
const ChatContainer = ({ messages, currentChat, setMessages }) => {
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const [newMessage, setNewMessage] = useState("")
  const [friend, setFriend] = useState()
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const dispatch = useDispatch()
  const scrollRef = useRef()
  useEffect(() => {
    socket?.emit("addUser", user._id)
  }, [user])
  useEffect(() => {
    socket?.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])
  const getUserInfo = async () => {
    const friendId = currentChat.members.find(member => member !== user._id)
    const response = await getUser(token, friendId)
    setFriend(response)
  }
  useEffect(() => {
    arrivalMessage && currentChat.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
    getUserInfo();
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      senderId: user._id,
      text: newMessage,
      chatId: currentChat._id
    }
    const recieverId = currentChat.members.find(member => member !== user._id)
    socket?.emit('sendMessage', ({
      senderId: user._id,
      text: newMessage,
      recieverId: recieverId
    }))

    try {
      const response = await axios.post('/api/messages', { message }, {
        headers: {
          "Authorization": `Barear ${token}`
        }
      })
      setMessages([...messages, response.data])
      setNewMessage("")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='bg-white flex flex-col justify-between' >
      {/* Chat header */}
        <div className='flex h-[55px] bg-[#02abc5] rounded-md items-center'>
        <button className='md:hidden mr-1 text-white  text-2xl' onClick={()=>{dispatch(setChat({showMessage:"hidden", showContact:"block"}))}} ><BiArrowBack/></button>
          {friend?.profilePic ?
            <img className='md:mx-1 w-10 h-10 rounded-full' src={friend?.profilePic} alt='profilepic' /> :
             <div className='block w-10 h-10 '>
             <img src={imageUrl} className='rounded-full h-full w-full' />
           </div>
          }
          <div className='pl-2'>
            <h3 className='text-white font-medium'>{friend?.name}</h3>
            <div className='text-sm font-medium'>Business chat...</div>
          </div>
        </div>
      {/* Chat messages */}
      <div className='custom-height overflow-y-scroll hide-scrollbar px-2 py-1'>
        {messages.map((m, index) => (
          <div ref={scrollRef} key={index} >
            <ChatBox message={m} own={m.senderId === user._id} />
          </div>
        ))}
      </div>
      {/* Chat input */}
      <div className='md:rounded-md h-[55px] w-full flex items-center md:static fixed bottom-0 right-0 bg-[#02abc5]'>
          <div className='flex items-center box-border w-full '>
            <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='flex-1 ml-2  w-full h-10 rounded-2xl px-4 focus:outline-none ' type="text" placeholder='Send a message........' />
            <div className='mx-2'>
              <button onClick={handleSubmit} className='bg-white rounded-full px-3 py-2 focus:outline-none'>
                <SubmitIcon />
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ChatContainer;

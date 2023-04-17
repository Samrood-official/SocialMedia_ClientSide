import React from 'react'
import { format } from 'timeago.js'
const ChatBox = ({ message, own }) => {
    return (
        <>
            {/* Sent message */}
            <div className={`flex flex-col my-1 ${own ? 'items-end' : 'items-start'}`}>
                <div className='max-w-[200px] md:max-w-sm'>
                    <div className={`border ${own ? 'border-blue-500 bg-blue-300' : 'bg-gray-400'} rounded-lg px-2 py-1 max-w-sm whitespace-normal break-words`}>
                        {message.text}
                    </div>
                    <div className='text-sm  text-gray-500 mt-1'>{format(message.createdAt)}</div>
                </div>
            </div>
            {/* Received message */}
            {/* <div className='flex flex-col items-start my-1'>
                <div className='border border-gray-300 rounded-lg px-2 py-1 max-w-sm'>
                    Sed eget massa vel ex sodales vehicula vitae nec lacus. Aliquam erat volutpat.
                </div>
                <div className='text-sm text-gray-500 mt-1'>3 hours ago</div>
            </div> */}
        </>
    )
}

export default ChatBox
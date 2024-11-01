import React from 'react'
import { useState } from 'react'
import { FaRegComment } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { imageUrl, WarningIcon, } from '../../icons/icons'
import axios from '../../utils/axios'
import { deletePost } from '../../utils/constants'
import EditPost from './EditPost'
import Comments from '../comment/Comments'
import { setDeletePost } from '../../state/userReducer'
import { likePost } from '../../state/apiCalls'
import ReportPost from './ReportPost'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GrLike } from 'react-icons/gr'
import { SinglePostModal } from '../SinglePost/SinglePost'
TimeAgo.addDefaultLocale(en)


export default function Post(props) {
    const {
        postId,
        desc,
        author,
        image,
        likes,
        comments,
        render,
        forceRender,
        createdAt
    } = props;

    const timeAgo = new TimeAgo('en-US')
    const [showSinglePost, setShowSinglePost] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [editPostModal, setEditPostModal] = useState(false)
    const [reportPostModal, setReportPostModal] = useState(false)
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    const userLiked = likes && likes[user._id];
    const likeCount = Object.keys(likes).length
    const PatchLike = () => {
        likePost(token, postId, dispatch)
        forceRender(!render)
    }

    const handleDeletePost = async () => {
        try {
            const response = await axios.delete(`${deletePost}/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const id = response.data.id
            dispatch(setDeletePost({ id: id }))

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className={`my-4 bg-white rounded-xl max-h-[calc(100vh-100px)] ${SinglePostModal ? 'overflow-scroll' : "" } hide-scrollbar`} onClick={() => showMenu && setShowMenu(false)}>
                <div className='flex px-1 justify-between items-center'>
                    <div className='flex gap-3 items-center pl-1 py-2 rounded-md font-sans cursor-pointer'>
                        {author?.profilePic ?
                            <img className='rounded-full w-10 h-10' src={author?.profilePic} alt='' />
                            :
                            <img className='rounded-full w-10 h-10' src={imageUrl} />
                        }
                        <div>
                            <p>{author.userName}</p>
                            <p className='pl-2 text-sm text-slate-500'>{timeAgo.format(new Date(createdAt))}</p>
                        </div>
                    </div>

                    {user?._id === author?._id ?
                        <div className='relative'>
                            <div onClick={() => setShowMenu(true)} className='w-8 h-8 flex justify-center items-center rounded-full hover:bg-[#e3e3e3] cursor-pointer mr-3'>
                                <BsThreeDots className='w-6 h-6' />
                            </div>
                            {showMenu ?
                                <div className="absolute border p-2  border-zinc-400 top-8  right-8 w-28 bg-white text-center cursor-pointer rounded-lg py-2">
                                    <p onClick={() => handleDeletePost()} className='py-2 rounded hover:bg-[#e3e3e3]   transition duration-200'>Delete</p>
                                    <p onClick={() => setEditPostModal(true)} className='py-2 rounded hover:bg-[#e3e3e3]  transition duration-200'>Edit</p>
                                </div>
                                : null}
                        </div>
                        : null}
                    {editPostModal &&
                        <EditPost desc={desc} setShowMenu={setShowMenu} postId={postId} editPostModal={editPostModal} setEditPostModal={setEditPostModal} />
                    }

                    {/* Report Post */}
                    {user?._id !== author?._id &&
                        <div className='relative'>
                            <div className='block w-10 h-10 cursor-pointer ' onClick={() => setReportPostModal(true)}>
                                <WarningIcon />
                            </div>
                        </div>
                    }

                    {/* reportmodal */}
                    {reportPostModal &&
                        <div>
                            <ReportPost postId={postId} setReportPostModal={setReportPostModal} />
                        </div>
                    }
                </div>
                <p className='bg-white py-2 pl-3'>
                    {desc}
                </p>

                <div className='flex justify-center select-none' onClick={() => setShowMenu(false)}>
                    <img className=' object-cover max-w-full'
                        src={image}
                    />
                </div>
                <div className='flex justify-between px-4 py-2'>
                    <div className='inline-flex'><AiFillLike className='w-6 h-6' />
                        <span className='pl-1'>{likeCount}</span></div>
                    <div>{comments?.length} Comments</div>
                </div>
                <hr className='mx-2 my-1' />

                <div className='flex hover:cursor-pointer'>
                    <div onClick={PatchLike} className=" w-full gap-2 flex justify-center b items-center">

                        {userLiked ?
                            <AiFillLike className='w-6 h-6 ' />
                            :
                            <AiOutlineLike className='w-6 h-6 ' />
                        }
                        <span> Like</span>
                    </div>
                    <div
                        onClick={() => setShowSinglePost(true)}
                        className='py-2 w-full gap-2 flex justify-center  items-center'
                    >
                        <FaRegComment className='w-4 h-4' />
                        <span className='text-sm'> Comment</span>
                    </div>
                </div>

                {showSinglePost && !props.singlePost ?
                    <SinglePostModal
                        setShowSinglePost={setShowSinglePost}
                        {...props}

                    />
                    : null}

                {props.singlePost ?
                    <div>
                        <Comments render={render} forceRender={forceRender} comments={comments} postId={postId} />
                    </div>
                    : null
                }
            </div>
        </>
    )
}
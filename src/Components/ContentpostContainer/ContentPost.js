import axios from '../../utils/axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { imageUrl } from '../../icons/icons'
import { addPost } from '../../utils/constants'
import { setPosts } from '../../state/userReducer'
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlinePhotoLibrary } from 'react-icons/md'
import { IoMdClose, IoMdPhotos } from "react-icons/io";
import { UserProfileLink } from '../UserProfileLink/UserProfileLink';
import Loader from '../Loader/Loader'

const ContentPost = () => {
  const userData = useSelector((state) => state.user)
  const posts = useSelector((state) => state.posts)
  const desc = useRef("")
  const dispatch = useDispatch()
  const [file, setFile] = useState()
  const [loaded, setLoaded] = useState(true)
  const [preview, setPreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  }
  const handlePost = async (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append("file", file)
    formData.append("userId", userData._id)
    formData.append("desc", desc.current?.value)
    try {
      if (!desc.current?.value) {
        toast.error("please write something in the post", {
          position: 'top-center'
        })
        return;
      }

      setLoaded(false)
      const response = await axios.post(addPost, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const post = response.data
      desc.current.value = ""

      setFile(null)
      setLoaded(true)
      setIsOpen(false)
      setPreview(null)
      dispatch(setPosts({ posts: [post, ...posts] }))

      toast.success('Post created successfully', {
        position: 'top-center'
      })

    } catch (err) {
      toast.error(err.message || err.error, {
        position: 'top-center'
      })
    }
  }
  return (
    <>
      <div className='bg-white rounded-xl p-2'>
        <div className='flex gap-5'>
          <img className='rounded-full w-12 h-12' src={imageUrl} />
          <input type='text' onClick={() => setIsOpen(true)} placeholder="What's on your mind" className=' rounded-3xl px-3 font-sans py-1 w-full outline-none bg-[#f0f2f5]' />
        </div>
        <hr className='mt-5' />
        <div className="flex justify-center my-2">
          <div className='flex justify-center cursor-pointer text-xl gap-2 py-1 px-10 hover:bg-[#f0f2f5] rounded-md'
            onClick={() => setIsOpen(true)}>
            <span className='text-sm'>Photo </span>
            <div className=' w-6 h-6'>
              <MdOutlinePhotoLibrary className='w-full h-full ' />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-scroll">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">
                  Create Post
                </h3>
                <p className=' h-6 w-6 cursor-pointer' onClick={() => setIsOpen(false)}>
                  <IoMdClose className='w-full h-full' />
                </p>
              </div>
              <div className="p-4 md:p-5">
                <UserProfileLink />
                <div className="space-y-3">

                  <div>
                    <textarea
                      type="text"
                      name="content"
                      className=" outline-none  text-sm block w-full p-2.5 "
                      placeholder={`What's on your mind, ${userData.name}`}
                      ref={desc}
                    />
                  </div>
                  <label htmlFor='file' className='cursor-pointer'>
                    <input type='file' accept='.jpg,.jpeg,.png' onChange={handleImageChange} name='file' id='file' hidden />
                    <div className='flex rounded-md flex-col mt-3 max-w-full items-center py-8 bg-slate-100 justify-center'>
                      <div className={`${preview ? 'absolute' : ''} p-2 bg-light-gradient rounded-full `}>
                        <div className='w-6 h-6 '>
                          <IoMdPhotos className=' w-full h-full' />
                        </div>
                      </div>
                      {!preview ?
                        (<>

                          <p className='text-sm'>Add Photos</p>
                          <p className='text-xs'>Or drag and drop</p>
                        </>)
                        :
                        <>
                          <div className='w-max-full '>
                            <img src={preview} className='w-full' />
                          </div>
                        </>
                      }
                    </div>
                  </label>
                  <Toaster />
                  <button disabled={!loaded} type='button' onClick={handlePost} className='bg-slate-200 hover:bg-light-gradient border-2 cursor-pointer rounded-md w-full p-2 tex-md'>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default ContentPost
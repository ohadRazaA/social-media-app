import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import profilePic from '../assets/profile-pic.png'
import postPic from '../assets/post pic.jpg'
import axios from 'axios'
import { PostContext } from '../context/PostContext'
import { AuthContext } from '../context/AuthContext'
import Loader from './Loader'

function Post() {
    const fileInputRef = useRef(null);
    const { allPosts, setAllPosts } = useContext(PostContext);
    const { user, url } = useContext(AuthContext);
    const [caption, setCaption] = useState('');
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        setIsLoading(true);
        const userId = localStorage.getItem('user-id');
        const response = await axios.get(`${url}posts/${userId}`);
        setAllPosts(response.data.friendsPosts);
        setIsLoading(false);
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
        }
    };
    const addPostHandler = async () => {
        const author = localStorage.getItem('user-id');
        if (caption) {
            setIsLoading(true);
            try {
                await axios.post(`${url}posts/`, { postPic, caption, author });
                setCaption('');
                fetchPosts();
                setIsLoading(false);
            } catch (error) {
                alert(error.data.message);
            }
        } else {
            alert('Please write a caption.');
        }

    }
    const onLikeHandler = async (postId) => {
        const userId = localStorage.getItem('user-id');
        try {
            const response = await axios.patch(`${url}posts/like`, { postId, userId });
            fetchPosts()
        } catch (error) {
            console.error(error);
        }
    }
    const onCommentHandler = async (postId) => {
        const userId = localStorage.getItem('user-id');
        if (comment) {
            try {
                const response = await axios.patch(`${url}posts/comment`, { postId, userId, comment });
                setComment('');
                fetchPosts()
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Please write a comment.');
        }

    }

    return (
        <div>
            <div className='bg-white rounded-lg p-4 h-32 border-2 border-neutral-300'>
                <div className='flex gap-4 items-center'>
                    <img className='w-14 h-14 rounded-full' src={profilePic} alt='' />
                    <span onClick={() => document.getElementById('my_modal_2').showModal()} className='border border-black rounded-full w-full p-3 cursor-pointer'>Start a post</span>

                    <dialog id='my_modal_2' className='modal'>
                        <div className='modal-box'>
                            <div className='flex items-center gap-2 mb-2'>
                                <img src={profilePic} className='w-14 h-14 rounded-full' alt='' />
                                <span>Ohad Raza</span>
                            </div>
                            <input className='w-full p-2 mb-2 border-none outline-none' type='text' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Write a caption...' />

                            <div>
                                <div className='flex gap-2'>
                                    <input type='file' className='hidden' accept='image/*' onChange={handleFileChange} ref={fileInputRef} />
                                    <label onClick={() => fileInputRef.current.click()} className='p-2 rounded-lg w-full cursor-pointer text-sm font-medium border-2 border-neutral-300 text-neutral-500'>Attach a photo</label>
                                </div>
                            </div>

                            <hr className='my-2' />
                            <div className='modal-action'>
                                <form method='dialog' onSubmit={(e) => e.preventDefault()} className='flex justify-end'>
                                    <button onClick={addPostHandler} className='btn'>Post</button>
                                </form>
                            </div>
                        </div>
                        <form method='dialog' className='modal-backdrop'>
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className='flex justify-around mt-3'>
                    <p>Media</p>
                    <p>Event</p>
                    <p>Write article</p>
                </div>
            </div>

            <hr className='border-neutral-500 my-2' />
            {
                isLoading ?
                    <div className='flex my-28 justify-center'>
                        <Loader />
                    </div>
                    : (

                        allPosts.map((post, index) => {
                            return (
                                <div key={index} className='mb-5'>
                                    <div className='bg-white rounded-lg p-4 border-2 border-neutral-300 mt-2'>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-4 items-center'>
                                                <Link to={'/user-profile'}>
                                                    <img className='w-14 h-14 rounded-full' src={profilePic} alt='' />
                                                </Link>
                                                <div>
                                                    <p className='text-sm text-neutral-500'>{`${post.author.firstName} ${post.author.lastName}`} . Following</p>
                                                    <p className='text-sm'>10:30 AM</p>
                                                </div>
                                            </div>
                                            {/*  */}
                                        </div>
                                        <p className='text-sm my-2'>{post.caption}</p>
                                        <img className='max-h-100 w-full rounded-lg' src={postPic} alt='' />
                                        <div className='flex justify-around my-2'>
                                            <div
                                                className={`cursor-pointer ${post.likes.includes(user._id) ? 'text-blue-700' : 'text-black'}`}
                                                onClick={() => onLikeHandler(post._id)}>
                                                <span>{post.likes.length}</span>
                                                <FontAwesomeIcon className='mx-1' icon={faThumbsUp} />
                                                <span>Like</span>
                                            </div>
                                            <div onClick={() => document.getElementById('my_modal_1').showModal()} className='cursor-pointer'>
                                                <span>{post.comments.length}</span>
                                                <FontAwesomeIcon className='mx-1' icon={faThumbsUp} />
                                                <span>Comment</span>
                                            </div>
                                            <dialog id={`my_modal_${index + 1}`} className="modal">
                                                <div className="modal-box">
                                                    <div>
                                                        {
                                                            post.comments.map(comment => {
                                                                return (
                                                                    <div key={comment._id} className='flex items-center gap-2 my-2'>
                                                                        <img src={profilePic} className='w-6 h-6 rounded-full' alt='' />
                                                                        <span>{comment.comment}</span>
                                                                    </div>
                                                                )
                                                            }
                                                            )}
                                                    </div>
                                                    <div>
                                                        <input placeholder='Write a comment...' className='outline-none my-2 w-full' type="text" onChange={(e) => setComment(e.target.value)} value={comment} />
                                                    </div>
                                                    <div className="modal-action ">
                                                        <button className='btn' onClick={() => onCommentHandler(post._id)}>Save</button>
                                                        <form method="dialog">
                                                            <button className="btn">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
            }
        </div>
    )
}

export default Post

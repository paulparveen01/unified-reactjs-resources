import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import "./post.css"

export const Post = () => {
    const [posts, setPosts] = useState()
    const [pageNum, setPageNum] = useState(0)
    const pagerRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        let page=""
        if(pageNum > 0) page=pageNum
        fetch(`https://jsonplaceholder.typicode.com/posts/${page}`)
        .then((response) => response.json())
        .then((data) => {
            setPosts((Array.isArray(data)) ? data : [data])
        })
    }, [pageNum])

    /**
     * Custom submit handler for click event.
     */
    const onSubmitHandler = ()=>{
        setPageNum(pagerRef.current.value)
    }

    const handlePostComments = (postid) => {
        navigate(`${postid}/comments`)
    }

    return (
        <div className='container-post'>
            <div className='navigate'>
                {/* Update page number */}
                <div className='page_changer'>
                    <input type="text" name="page_change" ref={pagerRef} defaultValue="" />
                    <input type='submit' name="btn" value="Goto Page" onClick={onSubmitHandler} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    posts && posts.map((data) => {
                        return (
                            <tr className='table_row' onClick={() => handlePostComments(data.id)}>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.tbody}</td>
                            </tr>
                        )
                    })
                }
                    </tbody>
                </table>
            </div>
            <div className='post-comments'>
                <Outlet />
            </div>
        </div>
    );
};
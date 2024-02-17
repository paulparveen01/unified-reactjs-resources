import React, { useEffect, useState, useId } from 'react';
import axios from 'axios'
import "./userListing.css"

const navigatePages = (data, numOfPages, pageNum) => {
    const pageData = data.slice((pageNum-1)*numOfPages, pageNum*numOfPages)
    return pageData;
}

const getUserData = async () => {
    const userResult = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    return userResult.data;
}

export const UserListing = () => {
    const [userData, setUserData] = useState("")
    const [pageNum, setPageNum] = useState(1)

    useEffect(() => {
        (async() => {
            const data = await getUserData()
            setUserData(data)
        })()        
        // return () => {}
    }, [])

    let dataLength = userData.length
    let pageSize = 10
    let numOfPages = Math.ceil(dataLength/pageSize)
    const reqPageData = navigatePages(userData, numOfPages, pageNum)

    const createPages = [...Array(numOfPages).keys()].map(x=>x+1)

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody> 
                {
                    reqPageData ? reqPageData.map((user) => {
                        const {userId, title, body, email} = user;
                        return (<tr>
                            <td>{userId}</td>
                            <td>{title}</td>
                            <td>{body}</td>
                        </tr>)
                    }) : null
                }
                </tbody> 
            </table>

            <div>
                <ul className='pageNumbers'>
                    <li onClick={() => setPageNum(pageNum-1)}>Prev</li>
                    {
                        createPages.map((num) => {
                            return <li key={num} onClick={() => setPageNum(num)} className={ pageNum==num ?  "active" : "" }>{num}</li>
                        })
                    }
                    <li onClick={() => setPageNum(pageNum+1)}>Next</li>
                </ul>
            </div>
        </>
    );
};
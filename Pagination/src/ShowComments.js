import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ShowComments = () => {
    const {id} = useParams()
    const [comments, setComments] = useState("")

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((response) => response.json())
        .then((data) => setComments(data))
    }, [id])

    return (
        <div>
            <div>Post comments</div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
            {
                comments && comments.map((cdata) => {
                    return (
                        <tr className='table_row'>
                            <td>{cdata.name}</td>
                            <td>{cdata.email}</td>
                            <td>{cdata.body}</td>
                        </tr>
                    )
                })
            }
                </tbody>
            </table>
        </div>
    );
};
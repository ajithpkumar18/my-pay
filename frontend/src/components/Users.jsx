import axios from 'axios'
import React, { useEffect, useState } from 'react'
import User from './User'
import Input from './Input'

const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/bulk?filter=" + filter, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(response => (
            setUsers(response.data.user)
        ))
    }, [filter])

    return (
        <div>
            <div className='mt-10'>
                <Input value={"Users"} placeholder={"Search"} text_size={"text-2xl font-bold"} onChange={(e) => setFilter(e.target.value)} />
            </div>

            {users.map((item) => (
                <User key={item._id} item={item} />
            ))}
        </div>
    )
}

export default Users
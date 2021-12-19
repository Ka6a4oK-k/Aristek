import React, { useEffect, useState} from 'react';
import UserSelect from './userSelect/UserSelect';
import axios from 'axios';
// import avatar from './header-res/avatar.svg'
import logo from './header-res/logo.svg'
import './Header.css'

export default function Header() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const usersResponse = await axios.get(`https://jsonplaceholder.typicode.com/users`)
            setUsers(usersResponse.data)
        })()
    }, [])

    return (
        <div className='header-wrapper'>
            <div className='header-title'>
                <div className='header-logo'>
                    <img className='logo-img' src={logo} alt="logo" />
                    <span className='logo-subtext'>To-Do</span>
                </div>
                <span className='title'>Tasks</span>
            </div>
            <div className='header-user'>
                <UserSelect users={users}/>
            </div>
        </div>
    )
}

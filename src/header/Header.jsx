import React from 'react'
import avatar from './header-res/avatar.svg'
import logo from './header-res/logo.svg'
import './Header.css'

export default function Header() {
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
                <span>userName</span>
                <img src={avatar} alt="avatar" />
                <select name="userSelect" id="">
                </select>
            </div>
        </div>
    )
}

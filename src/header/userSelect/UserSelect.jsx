import React, { useContext, useRef } from 'react'
import { useEffect } from 'react/cjs/react.development';
import UserContext from '../../contexts/UserContext';
import './UserSelect.css'

export default function UserSelect(props) {
    useEffect(() => {
        setCurrUserId(1)
    }, [])

    const { setCurrUserId } = useContext(UserContext);
    const Select = useRef();

    const selectUser = () => {
        setCurrUserId(Select.current.value);
    }

    return (
        <div>
            <select ref={Select} onChange={selectUser}>
                {props.users.map(user =>
                    <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
        </div>
    )
}

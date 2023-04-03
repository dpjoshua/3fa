import React, { useEffect } from 'react'
import Login from './Login';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userData } from './state';


export default function LoginWrapper() {
    const [name, setName] = useRecoilState(userData);

    const handleUser = (name) => {
        setName(
            {
                key: 'user-data',
                default: { name },
            }
        )
    }

    return (
        <div>
            <Login getUserName={(ele) => handleUser(ele)} />
        </div>
    )
}



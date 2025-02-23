import React, { useEffect } from 'react'
import { AuthStore } from '../store/useAuthStore'
import { Link, NavLink, useNavigate } from 'react-router';
import Login from './Login';

const HomePage = () => {
    const navigate = useNavigate(); 
    const {authUser , checkAuth , isCheckingAuth} = AuthStore(); 
    checkAuth(); 
    if(isCheckingAuth){
        return <div>Loading</div>
    }
    
    else{
        if(!authUser){
            navigate("/login"); 
        }
        return (
            <div>
                <h1>
                    Hello {authUser.fullName}
                </h1>
            </div>
        )
    }

}


export default HomePage
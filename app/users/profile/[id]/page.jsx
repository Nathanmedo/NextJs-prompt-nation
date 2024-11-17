"use client"

import Profile from '@components/Profile';
import React, { useEffect, useState} from 'react';
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const UserPage = ({params}) => {
const [ userData, setUserData ] = useState({});

useEffect(()=>{
    async function fetchUserData(){
        try{
            const response = await axios.get(`/api/users/${params.id}/profile`);
            setUserData(response.data.data);
        }catch(error){
            toast(error.response.data.message)
        }
    }
    fetchUserData();
}, [])

console.log(userData);

  return (
    <>
    <Toaster />
    <Profile 
    type={userData.username ?? userData.username}
    ProfileData={userData}
    isCurrentUser = {false}
    />
    </>
  )
}

export default UserPage;

'use client'

import React from 'react'
import Profile from '@components/Profile';
import SessionData from '@app/api/getSession/SessionData';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster} from 'react-hot-toast';


const MyProfile = () => {
    const [ ProfileData, setProfileData] = useState(null);
    const session = SessionData();


    useEffect(()=>{
        async function fetchProfileData(){
           try{
            if(session?.user?.id){
                const response = await axios.get(`api/users/${session?.user?.id}/profile`);
                console.log(response.data);
                
                setProfileData(response.data.data);
            }
           }catch(error){
            toast.error(error.response.data.message);
           }
        }
        fetchProfileData();
    }, [session]);

    console.log(ProfileData);

    const handleDelete = async () => {


    }

    const handleEdit = async () =>{

    }

  return (
    <>
    <Toaster />
    <Profile 
    type='My'
    ProfileData={ProfileData}
    isCurrentUser = {true}
    handleDelete
    handleEdit
    />
    </>
  )
}

export default MyProfile;

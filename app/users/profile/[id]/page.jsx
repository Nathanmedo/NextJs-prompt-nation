"use client"

import Profile from '@components/Profile';
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect, useState } from 'react';
import SessionData from '@app/api/getSession/SessionData';
import { handleFollowUser, fetchUserData } from '@app/api/helperFunctions/Helper';


const UserPage = ({params}) => {

  const [profileData, setProfileData ]= useState({});
  const [isFollowing, setIsFollowing ]= useState(null);
  const session = SessionData();

  console.log(session?.user?.id);
  
  useEffect(()=>{
      //destructure the id route parameter passed.
    const { id } = params;
    console.log(id);
    async function handleProfileLoading(){
       //get user profile data and return as prop
    const response =  await fetchUserData(id);
    setProfileData(response);
    

    //get the session data

    //confirm if following user already
    if(session?.user?.id){
      const isFollowing =  await handleFollowUser(response?._id, session?.user?.id);
      setIsFollowing(isFollowing);
    }
    }
    handleProfileLoading();
    }, [session?.user?.id]);

    console.log(profileData);
    

  return (
    <>
    <Toaster />
    <Profile 
    type={profileData.username ?? profileData.username}
    ProfileData={profileData}
    isCurrentUser={false}
    isFollowing={isFollowing}
    currentId = {session?.user?.id}
    />
    </>
  )
}




export default UserPage;

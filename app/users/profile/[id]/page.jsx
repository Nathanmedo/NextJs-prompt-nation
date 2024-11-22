"use client"

import Profile from '@components/Profile';
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect, useState } from 'react';
import SessionData from '@app/api/getSession/SessionData';
import { handleConfirmFollow, fetchUserData, fetchUserPrompts } from '@app/api/helperFunctions/Helper';


const UserPage = ({params}) => {

  const [profileData, setProfileData ]= useState({});
  const [ prompts, setPrompts ] = useState(null);
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

    //get prompts
    
    //confirm if following user already
    if(session?.user?.id){
      const promptResponse = await fetchUserPrompts(id);
      setPrompts(promptResponse);
      const isFollowing =  await handleConfirmFollow(response?._id, session?.user?.id);
      setIsFollowing(isFollowing);
    }
    }
    handleProfileLoading();
    }, [session?.user?.id]);

    console.log(prompts);
    

  return (
    <>
    <Toaster />
    <Profile 
    type={profileData.username && profileData._id == session?.user?.id ? 'My' : profileData.username}
    desc='Check out some of the latest prompts from this user'
    ProfileData={profileData}
    isCurrentUser={false}
    isFollowing={isFollowing}
    currentId = {session?.user?.id}
    prompts={prompts}
    />
    </>
  )
}




export default UserPage;

'use client'

import React, { useRef } from 'react'
import Profile from '@components/Profile';
import SessionData from '@app/api/getSession/SessionData';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster} from 'react-hot-toast';
import { fetchUserPrompts } from '@app/api/helperFunctions/Helper';
import EditProfile from '@components/EditProfile';
import gsap from 'gsap';


const MyProfile = () => {
    const [ ProfileData, setProfileData] = useState(null);
    const [ prompts, setPrompts ] = useState(null);
    const [ showEditProfile, setShowEditProfile ] = useState(false)
    const session = SessionData();
    const editProfRef = useRef(null);

    useEffect(()=>{
        async function fetchProfileData(){
           try{
            if(session?.user?.id){
                const response = await axios.get(`api/users/${session?.user?.id}/profile`);
                //get user prompts
                const promptResponse = await fetchUserPrompts(session?.user?.id);
                console.log(promptResponse)
                setPrompts(promptResponse)
                setProfileData(response.data.data);
            }
           }catch(error){
            toast(error.response.data.message);
           }
        }
        fetchProfileData();

        
    }, [session]);

    console.log(ProfileData);

  
    const openTabAnimation = (id) => {
      gsap.fromTo(`#${id}`, 
        { scale: 0, opacity: 0, y: -50 }, // Starting properties
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "back.out(1.7)" // Easing function for a smooth effect
        }
      );
    };
    
  return (
    <>
    <Toaster />
    <Profile 
    type='My'
    desc='This are all the prompts you have posted.'
    ProfileData={ProfileData}
    currentId={session?.user?.id}
    isCurrentUser = {true}
    setShowEditProfile={setShowEditProfile}
    prompts={prompts}
    setPrompts={setPrompts}
    openTabAnimation={openTabAnimation}
    />
    {showEditProfile && <div 
    ref={editProfRef}
    id='edit_profile_tab'
    className='fixed transtion ease-in-out inset-0 grid place-items-center w-screen h-screen bg-black bg-opacity-30 backdrop-blur-md border border-gray-300 rounded-lg'>
       <EditProfile 
        ProfileData={ProfileData}
        setShowEditProfile={setShowEditProfile}
        />
    </div>
    }
    </>
  )
}

export default MyProfile;
